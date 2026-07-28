---
slug: third-party-api-degraded-mode
title: "Every Startup Integration Needs a Degraded Mode"
metaTitle: "Designing SaaS for Third-Party API Failures"
description: A practical guide to dependency maps, timeouts, bounded retries, circuit breakers, queues, fallbacks, monitoring, kill switches, and provider exit plans.
metaDescription: Keep SaaS products usable during third-party API failures with dependency maps, timeouts, bounded retries, queues, circuit breakers, fallbacks, and kill switches.
author: Renowa Labs Engineering
publishedAt: 2026-04-02
updatedAt: 2026-07-22
category: Reliability
tags:
  - Third-Party APIs
  - Graceful Degradation
  - Reliability
  - System Design
relatedProduct:
coverImage: /engineering/covers/third-party-degraded-mode.webp
canonicalUrl: https://www.renowa-labs.com/engineering/third-party-api-degraded-mode
indexable: true
status: published
---

An integration lets a small team ship identity, payments, email, search, analytics, maps, or AI capability without building a company around each one. It also places another company’s latency, outages, limits, security decisions, pricing, and product roadmap inside your user experience.

The correct response is not to avoid providers or build every service twice. It is to decide, before launch, what the product does when each dependency is slow, partially wrong, unavailable, rate-limited, or discontinued.

## Make the dependency visible

Create a register for every external service in a customer or operational workflow. Record:

- feature and user journey that depend on it;
- synchronous or asynchronous call path;
- data sent and stored;
- authentication and secret owner;
- timeout, retry, and rate-limit behavior;
- provider status and support routes;
- product behavior during failure;
- data export and replacement plan;
- pricing unit and spend limit.

Then classify the dependency:

- **Hard:** the action cannot safely complete without it, such as authorizing a card payment.
- **Delayable:** work can be accepted and completed later, such as sending a receipt.
- **Enhancing:** the core workflow remains useful without it, such as enrichment, recommendations, or analytics.

This classification decides architecture. It also exposes accidental hard dependencies. A marketing analytics call should never prevent account creation because both were placed in one synchronous request.

## Put a deadline on every remote call

Without an explicit timeout, a slow dependency consumes requests, connections, workers, and user patience. Set connection and response deadlines based on the end-to-end product budget, not a convenient round number. A request with three sequential providers cannot give each the entire user-facing deadline.

Observe latency distributions and choose a timeout that balances false timeouts with resource protection. Distinguish connection, TLS, and response time where the client supports it. A timeout should produce a known product state: queued, retryable, degraded, or clearly failed.

Remember that timeout is uncertainty. The remote service may have completed the action after your client stopped waiting. For state-changing calls, use a stable idempotency key and a status lookup before asking the user to try again.

## Retry less, and retry deliberately

AWS’s [Builders’ Library guidance on timeouts, retries, and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) explains two central risks: retries can add load to a service that is already overloaded, and a timeout does not mean a side effect did not occur. It recommends idempotent operations, bounded retries, exponential backoff, and jitter to spread retry traffic.

Define a policy by failure class:

- retry a small number of transient connection failures, timeouts, and eligible server errors;
- honor `Retry-After` for rate limits when appropriate;
- do not retry authentication, validation, permission, or most client errors without a state change;
- cap attempts and total elapsed time;
- move delayable work to a durable queue;
- surface a clear failure or manual review when the outcome is ambiguous.

Avoid retries at every layer. If the browser, API server, job worker, SDK, and proxy each retry three times, one user action can create a storm. Assign one layer as the retry owner and understand SDK defaults.

## Stop cascading failures with isolation

A circuit breaker temporarily stops calls when a dependency is consistently failing, giving the provider and your own resources time to recover. A concurrency limit or bulkhead prevents one provider from consuming every application worker or database connection. A bounded queue absorbs brief interruptions without growing forever.

These mechanisms need business-aware states. When an AI summarizer fails, the product can show the original document and mark the summary unavailable. When the email provider fails, the product can complete signup, queue the welcome message, and offer an in-product confirmation. When payment authorization is unknown, it should not invent success or encourage duplicate charges.

Use the smallest honest fallback:

- cached or last-known data with an age label;
- a basic local search instead of external semantic ranking;
- delayed processing with visible status;
- manual review for a small number of high-value operations;
- feature disabled with a direct explanation and retry path.

Do not show fake real-time data, silently discard work, or call a fallback model whose privacy and output guarantees were never reviewed.

## Add a kill switch before an incident

Every nonessential integration should have a controlled way to disable calls without a full deployment. The switch can operate by provider, feature, tenant, region, or operation. Define whether disabling the integration queues work, skips enhancement, or blocks the action.

Protect the switch with authorization and audit logs. Document who can use it and how to restore normal operation. Test it in a staging failure exercise and occasionally in production on a safe slice; fallback paths decay when they are never executed.

For a critical provider, keep a runbook with status page, support severity, account identifier, contract contacts, customer message template, and local metrics needed to show impact. The provider’s status page is useful context, not monitoring. Your customers can fail because of an account-specific quota, expired token, unsupported region, or request shape while the provider remains globally green.

## Monitor the boundary, not just the homepage

Measure each dependency from the application’s perspective:

- request count, success rate, and error class;
- p50, p95, and p99 latency;
- timeouts and circuit state;
- rate-limit responses and remaining quota;
- queue age, oldest item, and dead letters;
- cost by feature or tenant;
- age of the last successful sync;
- business outcome such as messages delivered or invoices reconciled.

A synthetic provider check can detect broad outages, but it may not exercise your exact credentials, region, payload, or workflow. Combine probes with real request telemetry and an end-to-end canary that uses a safe test account.

Alert on silent staleness. A sync job that has processed zero records may look error-free while customer data is a week old. Track a heartbeat and expected progress separately from process uptime.

## Plan for changes and exits, not only outages

Providers also fail slowly through price changes, product deprecation, acquired roadmaps, new data terms, country restrictions, or support quality. Read changelogs and deprecation headers. Pin and test API versions where supported. Add contract tests for fields and behaviors your integration relies on.

Keep provider-specific types behind an adapter and store your own stable identifiers and business state. This does not make switching free, but it keeps vendor response shapes from spreading across the codebase.

Before adoption, test export. Ask what can be retrieved in bulk, which records remain after termination, whether phone numbers or domains can be ported, and whether customers must reauthorize. A theoretical second provider is not a fallback if migration requires six months of data cleanup.

## Run a dependency failure review

Choose the top five integrations and simulate:

1. connection timeout;
2. sustained `429` rate limits;
3. intermittent `500` responses;
4. success response with a missing or new field;
5. provider accepts a write but the response is lost;
6. credentials are revoked;
7. queue remains blocked for six hours.

Verify user communication, stored state, retries, alerting, support visibility, recovery, and reconciliation. Capture gaps as product work, not only infrastructure tickets.

## Next steps

Map one important user journey and mark every remote dependency as hard, delayable, or enhancing. Add explicit deadlines and a single bounded retry policy. Then implement and test one degraded mode and one kill switch.

A provider outage does not have to become your full-product outage. The product remains trustworthy when it can preserve user intent, state uncertainty honestly, continue the independent work, and recover without duplicating side effects.
