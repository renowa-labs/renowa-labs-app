---
slug: webhooks-financial-ledger
title: "Webhooks as a Financial Ledger: Signatures, Idempotency, and Reconciliation"
metaTitle: "Reliable Payment Webhooks for SaaS Billing"
description: A practical architecture for reliable payment webhooks using raw-body signature checks, durable inboxes, idempotent processing, state transitions, replay, and reconciliation.
metaDescription: Build reliable payment webhooks with signature verification, durable event storage, idempotent workers, ordered state transitions, replay, and reconciliation.
author: Renowa Labs Engineering
publishedAt: 2026-04-16
updatedAt: 2026-07-22
category: Payments Engineering
tags:
  - Webhooks
  - Payments
  - Idempotency
  - Reconciliation
relatedProduct:
coverImage: /engineering/covers/webhook-ledger.webp
canonicalUrl: https://www.renowa-labs.com/engineering/webhooks-financial-ledger
indexable: true
status: published
---

A payment webhook is an untrusted network message about a business event. It can arrive late, more than once, out of order, or not at all. Your endpoint can time out after the provider has sent it. Your worker can crash after granting access but before recording success.

If a SaaS product treats the handler as a controller that immediately toggles `isPaid`, retries become duplicate entitlements and missing messages become support incidents. Treat the integration as an event ledger instead: preserve evidence, authenticate delivery, process it idempotently, and periodically reconcile the local view with the payment provider.

## Keep the request body intact for verification

Verify the provider signature before interpreting or acting on the event. Stripe’s [webhook documentation](https://docs.stripe.com/webhooks?lang=node) requires the raw request body for its signature verification. Parsing JSON and then serializing it again can change whitespace or ordering and break validation.

The receiving route should:

1. read the raw bytes with a strict body-size limit;
2. select the correct endpoint secret;
3. verify signature and timestamp using the official library where available;
4. reject invalid or stale deliveries;
5. parse only after verification;
6. confirm the event and account belong to the expected environment.

Do not put credentials in the webhook URL. Use HTTPS and a high-entropy secret stored through the application’s secret-management system. Support secret rotation by accepting the old and new secret for a short documented window, then remove the old one.

Signature verification proves that a matching secret authenticated the payload. It does not prove that the event is new, relevant, from the expected connected account, or safe to apply twice.

## Persist first, process second

The synchronous endpoint should do the minimum required to accept durable responsibility. Store a webhook-inbox record containing:

- provider and environment;
- provider event ID and delivery ID when both exist;
- event type and object ID;
- verified raw payload or an encrypted protected representation;
- received timestamp;
- processing state and attempt count;
- last error and next retry time.

Place a unique constraint on the provider and event identifier. Insert the event and enqueue processing atomically when the infrastructure permits it. Then return a successful response. GitHub’s [webhook best practices](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks) similarly recommend responding quickly and processing through a queue; GitHub expects a response within ten seconds.

Do not return `2xx` before the event is durable. If the process dies after acknowledging but before storage, the provider sees success while your system has no evidence. Conversely, do not hold the network request open while sending email, calling other providers, or rebuilding permissions.

## Make processing idempotent at the business level

Deduplicating the provider event ID handles repeated delivery of the same event. It does not handle two different events that represent the same business effect or a crash halfway through a workflow.

Wrap local state changes in a transaction and model immutable facts. Instead of only setting `subscription.active = true`, record the provider subscription ID, event ID, effective period, status transition, and the entitlement decision derived from it. Put an outbox record in the same transaction for follow-up work such as email or analytics. A separate worker can deliver those effects idempotently.

Use stable semantic keys:

- invoice credit: provider plus invoice ID plus credit type;
- entitlement period: customer plus product plus effective period;
- refund: provider plus refund ID;
- notification: event ID plus template purpose.

When your application calls a payment API to create or modify state, send the provider’s idempotency key as well. Stripe’s [idempotent request documentation](https://docs.stripe.com/api/idempotent_requests) explains that a repeated create or update request with the same key can return the saved result rather than performing the operation twice. Store that key with the local operation so a timeout can be retried safely.

## Do not assume delivery order

Stripe explicitly warns that webhook endpoints should not depend on events arriving in a particular order. A subscription update may appear before the checkout-completed event your code expected to create the local customer. A delayed cancellation may arrive after a later renewal event.

Order state using provider object version, effective timestamps, or retrieval of the current provider object—not merely the local receive time. Write transition rules that reject impossible regressions. For example, a stale event should not overwrite a newer subscription period just because its worker ran last.

Some events are commands to investigate rather than complete truth. On receiving an unfamiliar or apparently stale event, fetch the canonical object from the provider using its ID, within rate limits and with bounded retries. Keep the original event as evidence even if the resulting state does not change.

## Design access from entitlements, not payment labels

Payment statuses do not map one-to-one to product access. A failed renewal might enter a grace period. A refund might remove only a purchased add-on. A disputed payment may require review. A scheduled cancellation should often keep access through the paid period.

Create an entitlement policy that consumes billing facts and produces explicit `startsAt`, `endsAt`, `reason`, and source records. Keep provider-specific labels inside the billing integration. This allows the company to change processors or support manual enterprise contracts without scattering `if stripeStatus` logic throughout the product.

Define customer-visible behavior for delayed events. If checkout succeeded but entitlement processing is still pending, show a processing state and an auditable retry path instead of asking the customer to pay again.

## Reconciliation catches what delivery cannot

No webhook system guarantees that the local database is permanently correct. Providers have delivery windows, retention limits, manual dashboard changes, and API behavior that evolves. GitHub, for example, documents that it does not automatically redeliver failed deliveries and offers a limited recent redelivery window in its [redelivery guide](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks). Provider behavior must be read, not assumed.

Run scheduled reconciliation:

1. list provider objects or balance transactions changed since a safe cursor;
2. overlap the previous window to tolerate delayed updates;
3. compare subscriptions, invoices, payments, refunds, disputes, and payouts with local records;
4. record differences without immediately hiding them;
5. repair through the same idempotent transition functions used by webhooks;
6. alert on unresolved money or entitlement differences.

Reconcile payout statements to bank deposits separately. The webhook stream explains operational events; the provider balance and statements explain the money actually owed and transferred.

## Operate the inbox like a product system

Build an internal view that can search by customer, event, object, and request ID. Show signature result, receive time, attempts, current state, error, related local records, and safe replay action. Redact secrets and sensitive payment data.

Monitor time from provider event creation to durable receipt, queue age, success rate, duplicate rate, unknown event types, repeated failures, and reconciliation differences. Send failed events to a dead-letter state after bounded attempts, but keep an alert and a repair path. A dead-letter queue without an owner is a slower form of data loss.

Test duplicate delivery, reverse order, signature failure, timeout after provider success, worker crash after database commit, unknown event type, secret rotation, and provider API unavailability.

## Next steps

First, put a unique provider-event key and durable inbox in front of the current handler. Second, move side effects behind an idempotent worker and transactional outbox. Third, add a daily comparison of active subscriptions, recent invoices, refunds, and disputes.

Reliable billing does not come from receiving every message exactly once. It comes from making repeated processing safe, preserving enough evidence to explain state, and detecting when the provider and product disagree.
