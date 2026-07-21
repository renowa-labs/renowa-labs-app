---
slug: detecting-duplicate-jobs-across-platforms
title: How Hirinq Detects Duplicate Jobs Across Multiple Platforms
description: A practical look at the signals, confidence rules, and candidate-experience decisions involved in identifying duplicate vacancy listings.
author: Renowa Labs Engineering
publishedAt: 2026-07-21
updatedAt: 2026-07-21
tags:
  - Recruitment Technology
  - Data Quality
  - Matching
relatedProduct: hirinq
coverImage: /og/renowa-og.svg
canonicalUrl: https://www.renowa-labs.com/engineering/detecting-duplicate-jobs-across-platforms
indexable: true
status: published
---

Job seekers rarely experience the vacancy market as one clean catalogue. The same role can appear on an employer's careers page, a recruitment portal, a social post, and a regional listing site. Titles may be shortened, descriptions reformatted, locations written differently, and application links wrapped by each publisher. To a candidate, these copies create noise: the search feels larger than it is, saved lists become repetitive, and it is difficult to know whether two entries represent the same opportunity.

For Hirinq, duplicate detection is therefore a product-quality problem before it is a data problem. The goal is not to prove that two documents are mathematically identical. It is to decide when showing both records would make the candidate experience worse, while avoiding the more serious mistake of merging genuinely different roles.

## Start with a canonical vacancy shape

Comparison becomes reliable only after every source is translated into a common structure. A useful vacancy record separates employer, title, location, employment type, seniority, description, publication time, application destination, and source attribution. Raw source text is preserved for traceability, but matching works with normalized fields.

Normalization should be conservative. It can standardize whitespace, case, common punctuation, Unicode variants, and familiar location abbreviations. It can remove presentational fragments that a source repeatedly adds to every record. It should not erase words simply because they are inconvenient. Terms such as "senior," "intern," "remote," or a district name may be the only evidence that two similar listings are different.

Employer identity also needs its own treatment. "Example LLC," "Example MMC," and "Example" may describe the same organization, but a shared word in two company names is not enough. Verified domains, employer profile identifiers, and known aliases are stronger evidence than surface text alone.

## Use several independent signals

No single field is dependable across multiple vacancy sources. Hirinq can build confidence from a group of signals, each answering a different question.

- **Employer similarity:** Do the normalized employer identities, domains, or verified aliases agree?
- **Title similarity:** Do the titles describe the same function and seniority after standardization?
- **Location compatibility:** Are the city, region, remote status, and workplace arrangement consistent?
- **Description overlap:** Do distinctive responsibilities, requirements, and benefits appear in both records?
- **Application destination:** Do the links resolve to the same employer page, email address, or external application endpoint?
- **Time proximity:** Were the records published or observed within a plausible reposting window?
- **Source relationship:** Is one source known to republish vacancies from another source?

Some signals should carry more weight than others. A shared application URL is usually stronger than a similar title. A matching employer and a highly distinctive description can outweigh formatting differences. Conversely, common titles such as "Sales Manager" need more supporting evidence because many organizations may advertise them at the same time.

The system should also use negative evidence. Different cities, incompatible seniority, different departments, or clearly different application destinations can prevent an otherwise tempting merge. Good duplicate detection is as much about knowing when not to combine records as it is about finding matches.

## Generate candidates before making decisions

Comparing every new vacancy with every existing vacancy becomes wasteful as coverage grows. A candidate-generation step narrows the search to records that have a reasonable chance of matching. Employer identity, title tokens, location, and recent publication windows can create small comparison groups. More expensive description or semantic comparisons then run only inside those groups.

This two-stage pattern matters for product responsiveness. Sources can be processed continuously without requiring an exhaustive comparison pass, and matching rules can remain explainable. It also allows Hirinq to keep a cautious threshold for uncommon edge cases instead of lowering quality to gain speed.

## Treat the output as a group, not a deletion

When two records are likely duplicates, the safest model is not to destroy one. Hirinq can retain source records and connect them to a canonical opportunity group. The candidate sees one clear opportunity, while the system preserves provenance, observation times, and alternative application routes.

That distinction supports several product decisions. A source may contain a fresher closing date. An employer page may be the preferred direct application destination, while another listing includes useful structured salary information. A canonical group can select the best candidate-facing fields without pretending that the source records never existed.

It also makes corrections possible. If later evidence shows that two vacancies are separate, the group can be split without reconstructing discarded records. If a new source confirms an existing opportunity, it can join the group and improve confidence.

## Confidence should shape the interface

Duplicate detection is not always binary. High-confidence matches can be grouped automatically. Medium-confidence cases can remain separate until more evidence arrives or enter a review queue. Low-confidence pairs should not affect the candidate experience.

Thresholds should reflect the cost of each error. Showing a duplicate is mildly frustrating; hiding a distinct job can remove a real opportunity. That asymmetry suggests a cautious default, particularly for common titles and employers recruiting several people at once.

The interface can remain simple even when the internal decision carries nuance. Candidates do not need a similarity score. They need a clean feed, accurate details, a trustworthy application path, and consistent saved-job behaviour. Source attribution can remain available without turning every card into a data-audit screen.

## Measure candidate impact, not only model accuracy

Offline evaluation is necessary: reviewed pairs can reveal precision, missed duplicates, and error patterns by source or category. But product signals matter too. Repeated saves of equivalent records, rapid dismissals after opening a duplicate, and reports of separate roles being merged can identify failures that a laboratory dataset misses.

Evaluation sets must include hard negatives: several roles from the same employer, recurring graduate programmes, vacancies reposted after meaningful changes, and generic titles across unrelated companies. Easy examples produce attractive metrics without protecting the actual experience.

For Hirinq, the standard is straightforward: each opportunity should feel distinct, current, and actionable. Achieving that standard requires structured data, multiple matching signals, conservative decision rules, preserved provenance, and a feedback loop tied to what candidates see. Duplicate detection succeeds when the technology disappears and the opportunity feed simply feels coherent.
