---
slug: merchant-of-record-vs-payment-processor
title: "Merchant of Record or Payment Processor? A Founder’s Decision Guide"
metaTitle: "Merchant of Record vs Payment Processor for SaaS"
description: A practical comparison of merchant-of-record platforms and direct payment processing, including tax, fees, chargebacks, accounting, control, and migration risk.
metaDescription: Compare merchant-of-record platforms with direct payment processing for SaaS across tax, fees, chargebacks, accounting, customer control, and migration.
author: Renowa Labs Engineering
publishedAt: 2026-07-16
updatedAt: 2026-07-22
category: Payments and Billing
tags:
  - Merchant of Record
  - SaaS Billing
  - Payments
  - Sales Tax
relatedProduct:
coverImage: /engineering/covers/merchant-of-record.webp
canonicalUrl: https://www.renowa-labs.com/engineering/merchant-of-record-vs-payment-processor
indexable: true
status: published
---

The most important checkout decision is not the button style or even the provider fee. It is deciding who legally sells the product to the customer.

With direct payment processing, your company is normally the merchant. The processor moves payment information and funds, but your company remains responsible for the sale, applicable indirect taxes, refunds, disputes, invoices, and customer terms. A merchant of record, or MoR, becomes the legal seller for the transaction and takes on a larger part of that operating burden.

Neither model is universally better. The right one depends on where you sell, what you sell, deal size, sales motion, internal finance capacity, and how much control you need.

## Understand what the merchant of record actually owns

[Stripe’s merchant-of-record overview](https://stripe.com/resources/more/merchant-of-record) describes the MoR as the entity legally responsible for a customer transaction, including payment processing, tax collection and remittance, fraud, compliance, and transaction reporting. Paddle, Lemon Squeezy, and Dodo Payments offer MoR services for supported digital products and markets.

That shift can remove a large operational surface for an international SaaS company. Instead of registering, calculating, collecting, and remitting VAT, GST, or sales tax independently in many jurisdictions, the MoR applies its registrations and rules to the customer transaction. It can also issue the customer invoice and handle the first layer of disputes and refunds.

It does not outsource the entire finance function. Lemon Squeezy’s [sales-tax guidance](https://docs.lemonsqueezy.com/help/payments/sales-tax-vat), for example, explicitly distinguishes taxes on the customer sale from the income or corporate taxes the software company may owe on payouts. Your company still needs bookkeeping, revenue recognition decisions, payout reconciliation, owner and payroll tax work, and local filings.

## Compare total cost at your actual price and customer mix

Headline rates are only the starting point. Lemon Squeezy currently advertises a 5% plus 50-cent base ecommerce fee, while its [fee documentation](https://docs.lemonsqueezy.com/help/getting-started/fees) lists additions for some international, PayPal, and subscription transactions. A ten-dollar subscription and a ten-thousand-dollar annual contract react very differently to percentage pricing.

Model at least three scenarios using your expected:

- monthly and annual prices;
- customer countries and currencies;
- business-to-business versus consumer mix;
- payment methods;
- refund and dispute rate;
- average contract value;
- support and tax-registration costs under direct processing.

For a low-volume global product, a higher transaction percentage can be cheaper than tax registrations, filing software, accounting review, and engineering work. At larger volume or contract value, direct processing plus a tax platform may cost less and give the company more control. Ask each provider for a written fee schedule because thresholds, negotiated pricing, and product eligibility change.

## Follow one transaction all the way to the ledger

Do not evaluate checkout in isolation. Trace a representative transaction from price display through payment, tax, invoice, refund, chargeback, payout, and accounting import.

[Paddle’s statement documentation](https://www.paddle.com/help/manage/get-paid/what-statements-will-i-receive) explains that sellers receive monthly statements, reverse invoices, and remittance advice. Those reports are essential because the payout arriving in the bank is net of several movements. Your ledger still needs to explain gross customer receipts, indirect tax, provider fee, refund, dispute, currency conversion, and the amount owed to your company.

Chargebacks also remain economically relevant. Paddle’s [chargeback guide](https://www.paddle.com/help/manage/risk-prevention/understanding-chargebacks-with-paddle) says the dispute is raised against Paddle as MoR, but the chargeback amount and fee are deducted from the seller balance. “The provider handles disputes” does not mean disputes are free or have no effect on cash flow.

Before signing, request sample exports and reconcile ten test scenarios, including partial refunds, plan changes, tax-exempt business customers, a failed payment, a chargeback, and a sale and refund that fall into different payout periods.

## Evaluate the customer relationship and sales motion

An MoR appears on the customer’s card statement and often controls the formal invoice and checkout terms. That can be ideal for self-serve software but create friction in enterprise procurement. A customer may expect your legal entity on the order form, require vendor onboarding with that entity, or negotiate payment terms that the standard MoR checkout does not support.

Check these questions:

- Whose name appears at checkout, on invoices, and on statements?
- Can the provider support purchase orders, wire transfers, net terms, and negotiated contracts?
- Who answers billing questions and how are support handoffs handled?
- Can you control refund policy within consumer-law limits?
- Which countries, currencies, product types, and payment methods are excluded?
- Does the provider accept marketplace, service, usage-based, or hybrid revenue?

Dodo’s [MoR introduction](https://docs.dodopayments.com/features/mor-introduction), Paddle’s [tax documentation](https://www.paddle.com/help/sell/tax/how-paddle-handles-vat-on-your-behalf), and each provider’s acceptable-use rules are better decision inputs than a generic comparison table.

## Price the migration before choosing the provider

The painful part of changing billing platforms is rarely the checkout component. It is moving active subscriptions, stored payment authority, invoices, entitlements, coupons, tax evidence, customer portals, dunning state, and webhook-driven product access.

Ask in writing:

- Can active subscriptions and payment credentials be exported or migrated?
- What customer consent or re-entry is required?
- Are customer, transaction, invoice, and tax records available through an API and bulk export?
- How long are records accessible after termination?
- Can webhooks be replayed?
- What reserves, payout delays, or termination rights apply?

Maintain your own customer ID, plan ID, entitlement state, and provider mapping. A billing provider should be an integration around the product’s access model, not the only database that knows what a customer bought.

## A practical decision rule

An MoR is often a strong starting point when a small team sells standardized digital products globally, has many consumer or small-business customers, and wants to reduce indirect-tax operations. Direct processing is often stronger when the company sells high-value contracts, needs deep checkout and invoice control, has finance capacity, or must be the contracting seller for enterprise customers.

Run a two-week evaluation:

1. Confirm product and founder-country eligibility with each shortlisted provider.
2. Calculate total fees across three real revenue scenarios.
3. Reconcile test transactions into the accounting system.
4. Test tax IDs, refunds, disputes, subscription changes, and failed payments.
5. Review customer terms, reserves, payout timing, data export, and termination with counsel.

Choose the legal and operational model first. Then choose Paddle, Lemon Squeezy, Dodo Payments, Stripe, or another provider that executes that model well. Reversing those two decisions is how a convenient checkout becomes an expensive company constraint.
