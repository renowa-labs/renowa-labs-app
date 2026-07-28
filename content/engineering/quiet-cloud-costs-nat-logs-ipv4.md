---
slug: quiet-cloud-costs-nat-logs-ipv4
title: "The $5 Service With a $100 Cloud Bill: NAT, Logs, IPv4, and Quiet Costs"
metaTitle: "Hidden AWS Costs: NAT, Logs, IPv4, and Data Transfer"
description: A founder-friendly method for finding and preventing quiet cloud costs from NAT gateways, logs, public IPv4 addresses, data transfer, idle resources, and autoscaling.
metaDescription: Find and prevent hidden AWS costs from NAT gateways, logs, public IPv4 addresses, data transfer, idle resources, and unconstrained scaling.
author: Renowa Labs Engineering
publishedAt: 2026-07-08
updatedAt: 2026-07-22
category: Cloud Infrastructure
tags:
  - AWS
  - Cloud Costs
  - Infrastructure
  - FinOps
relatedProduct:
coverImage: /engineering/covers/quiet-cloud-costs.webp
canonicalUrl: https://www.renowa-labs.com/engineering/quiet-cloud-costs-nat-logs-ipv4
indexable: true
status: published
---

A small application can run on a five-dollar compute instance and still produce a three-digit cloud bill. The surprise usually comes from the architecture around the instance: an always-on network gateway, retained logs, public addresses, cross-zone traffic, orphaned storage, or a workload allowed to scale without a cost boundary.

This is not proof that managed cloud services are a bad deal. Reliability and reduced operating work have value. The mistake is estimating only the headline compute price while treating networking, observability, and growth controls as free.

## Estimate architecture, not servers

Before deploying, draw every paid path a request can take:

1. user to edge or load balancer;
2. edge to application;
3. application to database, object storage, and external APIs;
4. every component to logs, metrics, traces, and backups;
5. traffic between availability zones or regions.

For each arrow, ask whether pricing includes an hourly resource charge, per-request charge, bytes processed, or data transfer. Then calculate a quiet month and a noisy month. The noisy case should include a retry loop, crawler traffic, an unusually verbose release, and the maximum autoscaling configuration.

A budget is the result of architecture multiplied by behavior. A cheap resource with unbounded behavior is not a cheap system.

## NAT gateways charge for existence and traffic

Private subnets often reach the internet through a NAT gateway. AWS’s [NAT gateway pricing guidance](https://docs.aws.amazon.com/en_en/vpc/latest/userguide/nat-gateway-pricing.html) explains that the service has an hourly charge and a per-gigabyte data-processing charge. Data-transfer charges can also apply to the traffic path.

That means a development environment with little application traffic can still have a meaningful baseline. A chatty production workload can then pay for both the bytes leaving through the NAT gateway and the managed gateway processing those bytes.

The right optimization depends on the workload:

- Use a gateway endpoint for supported services such as Amazon S3 or DynamoDB when it removes unnecessary NAT traffic.
- Keep a workload and its NAT gateway in the same availability zone when the reliability design permits it, avoiding an accidental cross-zone path.
- Avoid copying a production multi-zone NAT layout into every temporary environment without evaluating the fixed cost.
- Consider a NAT instance only if the lower price justifies patching, capacity planning, failover, and security work your team will now own.

Do not delete a NAT gateway merely because it appears expensive. First confirm the route tables and workloads that depend on it. A cost reduction that removes outbound updates or security telemetry is an outage waiting to happen.

## Logs are durable until you tell them not to be

CloudWatch log groups default to never expiring unless a retention policy is set, as described in AWS’s [log-group documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html). A debug line written once per request can therefore create ingestion cost now and storage cost long after it has diagnostic value.

Adopt a log budget per service:

- define which events are required for security, audit, and support;
- sample repetitive successful events;
- remove secrets and large request or response bodies;
- set explicit retention for every log group;
- export only records with a real long-term use;
- alert when daily ingestion changes materially.

CloudWatch offers log classes with different capabilities and pricing trade-offs; the [official log-class comparison](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch_Logs_Log_Classes.html) should guide the choice. Retention is still the first control. Moving useless logs to cheaper storage only makes useless logs cheaper.

## Public IPv4 addresses have a visible meter

AWS introduced a public IPv4 charge of $0.005 per address-hour, whether an address is attached or idle, as explained in the [AWS announcement](https://aws.amazon.com/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/). At that published rate, one continuously used address is roughly $3.60 in a 30-day month before traffic. Several forgotten addresses across environments become a real line item.

Use Public IP Insights or an account inventory to identify what owns each address. Release unused Elastic IP addresses, prefer private networking where appropriate, and understand which managed resources allocate public addresses implicitly. IPv6 can reduce IPv4 dependence, but it is an architecture decision requiring application, client, DNS, firewall, and monitoring support—not a billing toggle.

## Data transfer follows the actual route

“Traffic inside AWS” is not one free category. Charges may differ for same-zone, cross-zone, regional, inter-region, internet, and service-specific paths. The [AWS Cost and Usage Report data-transfer guide](https://docs.aws.amazon.com/cur/latest/userguide/cur-data-transfers-charges.html) shows how usage types reveal transfer charges.

If the transfer bill moves unexpectedly, group cost by usage type and region, then compare it with architecture and flow data. Common causes include:

- application and database in different availability zones;
- container image pulls or package downloads through NAT;
- large assets served from an origin instead of a cache;
- backup replication to another region;
- telemetry sent to an external vendor;
- a client retrying downloads after timeouts.

Do not optimize solely from an invoice label. Confirm the source, destination, and owner of the bytes.

## Put limits on everything that can multiply

Serverless functions, queues, autoscaling groups, log streams, and AI API calls can expand faster than a person can respond. Configure an intentional maximum for concurrency, instance count, queue consumers, batch size, request body size, log event size, and third-party spend.

AWS Budgets and billing alerts are detection controls, not guaranteed hard caps. Metering data can arrive after usage has occurred. Pair financial alerts with product-level limits such as per-tenant quotas, circuit breakers, and rate limits. Alert both on absolute spend and on a rapid change in a usage metric.

## Run a weekly ten-minute cost review

For an early product, the review can be simple:

1. Compare month-to-date spend with the same day last month and with the forecast.
2. Group the largest change by service, region, account, and usage type.
3. Find untagged resources and assign an owner.
4. Inspect all regions, including ones the team does not normally use.
5. Check idle addresses, volumes, snapshots, load balancers, databases, and gateways.
6. Review maximum scaling settings and high-volume log groups.
7. Record the explanation for every material change.

Stopping a compute instance does not necessarily remove its volume, snapshot, public address, load balancer, or database. Deleting an application stack through the infrastructure tool that created it is usually safer than clicking individual resources and assuming the bill disappeared.

## Next steps

Set explicit log retention today. Add a budget and anomaly alert. Inventory NAT gateways and public IPv4 addresses. Then model one failure case in which traffic, logs, or retries increase by 100 times.

The useful question is not “How much is this server?” It is “What can this architecture create, retain, transfer, or multiply while nobody is watching?”
