# Engineering cover editorial direction

These covers are derived from the complete articles, not from their titles alone. Each final image is generated as a 1200 × 630 controlled SVG composition and rendered to WebP with `npm run covers:build`. Editable sources are in `source/`; unchanged first-party brand assets are in `brands/`. Covers do not include sequence counters because they are independent article images, not numbered slides in a series.

## Article concepts and selections

### International founder’s US company operations stack

- Core insight: formation is a single record; an operable company needs coherent identity, address, banking, payment, filing, ownership, and recovery records.
- Considered: a formation receipt beside an operating register; an operating passport surrounded by providers; a formation-to-filings lifecycle rail.
- Selected: the receipt/register comparison because it makes “formed ≠ operating” visible while naming the four address roles and the minimum operational register.

### Merchant of record vs payment processor

- Core insight: the decisive difference is who legally sells to the customer.
- Considered: two parallel transaction flows; a legal-seller decision tree; two customer receipts with different seller lines.
- Selected: parallel direct-processing and MoR flows. The direct side keeps the company as legal seller; the MoR side makes the MoR the seller and shows the net payout to the company.

### Quiet cloud costs

- Core insight: architecture and behavior create the bill, not the compute headline alone.
- Considered: an itemized infrastructure statement; a network path with cost badges; a visual balance between a small server and a large bill.
- Selected: the statement because NAT hours and bytes, log ingestion and retention, IPv4 address-hours, transfer routes, and autoscaling are naturally legible as separate meters.

### Authentication after login

- Core insight: recovery, factor changes, sessions, tenant authorization, and support access are alternate routes to authority.
- Considered: a complete account state machine; a threat-test matrix; a privileged-action receipt.
- Selected: the state map because it shows the main path and the alternate paths that require equivalent proof, reauthentication, revocation, notification, and audit controls.

### Transactional email

- Core insight: deliverability is an identity and operations system, and transactional and marketing streams need separate controls.
- Considered: two mail streams; a forensic message-header view; a DNS authentication record stack.
- Selected: the two-stream operations board with SPF, DKIM, DMARC, event lifecycle, and suppression handling.

### AI evals

- Core insight: observed failures should become a versioned evaluation loop before prompt changes are claimed as improvements.
- Considered: the full evaluation pipeline; a current-versus-candidate diff; a failure-taxonomy board.
- Selected: the pipeline plus run report because it shows real failures, deterministic checks, a calibrated grader, regression status, and the quality/latency/cost trade-off.

### Backup restore testing

- Core insight: backup status is not recovery evidence; the restore must be timed and validated against business invariants.
- Considered: an RPO/RTO timeline; a restore-drill report; a backup-versus-proven-restore comparison.
- Selected: the restore report because the clock, RPO/RTO definitions, state inventory, validations, and evidence owner all belong in one operational artifact.

### Founder access map

- Core insight: one personal inbox is a company-wide single point of failure; company ownership needs two independent administrators and an external recovery route.
- Considered: an access ownership map; a before/after service register; a quarterly recovery drill card.
- Selected: the before/after access graph because it makes the ownership concentration and its correction immediately visible.

### Webhooks as a financial ledger

- Core insight: webhook delivery is at least once and unordered; reliability comes from raw-body verification, durable storage, idempotent effects, and reconciliation.
- Considered: an event-ledger pipeline; an out-of-order event sequence; an internal webhook inbox screen.
- Selected: the ledger pipeline with a deliberate duplicate event, unique key, idempotent worker, entitlement record, and provider-to-local reconciliation loop.

### Third-party degraded mode

- Core insight: hard, delayable, and enhancing dependencies require different honest failure behavior.
- Considered: a dependency register; normal-versus-degraded paths; an incident control panel.
- Selected: the three-class degraded-mode map because the difference between blocking, queueing, and skipping an enhancement is the article’s most useful decision model.

### Application flows in Hirinq

- Core insight: direct, email, and external applications have different handoff and tracking boundaries that must be clear before the candidate starts.
- Considered: three horizontal handoff lanes; a candidate journey with branching routes; an activity-state comparison table.
- Selected: three handoff lanes because they distinguish the candidate action from the tracking claim—especially “opened ≠ sent” for email and an unknown receipt state after an external handoff.

### Building AI-first products

- Core insight: AI is one layer inside a complete product system built around a decision worth improving.
- Considered: a layered product stack; a workflow decision loop; a model-quality versus product-quality matrix.
- Selected: the decision-to-system-to-user-control flow plus the five quality layers: data, system, model, interaction, and operations.

### Duplicate job detection

- Core insight: multiple source records should become a reversible canonical opportunity group without losing provenance.
- Considered: three sources converging into one group; a pairwise match report; a confidence and negative-evidence matrix.
- Selected: the source-to-signals-to-group pipeline because it makes both retained source records and the cautious merge threshold visible.

### Mobile-first job discovery

- Core insight: a mobile vacancy card should support the next candidate decision, not maximize scrolling volume.
- Considered: a phone wireframe; a five-question content hierarchy; a discover-save-resume-apply state loop.
- Selected: the phone interface paired with the hierarchy and state loop, including button equivalents, undo, saved state, and variable-network considerations.

### Multi-source vacancy aggregation

- Core insight: source-specific collection contracts should produce one canonical, attributable, fresh candidate model.
- Considered: a source pipeline; a canonical-record schema; a freshness and recovery operations board.
- Selected: the full pipeline from source adapters through normalization and provenance to the candidate feed, with freshness, retry, change detection, and trust controls.

## Official third-party assets

Third-party marks are used only to identify providers discussed editorially. Their presence does not imply partnership, sponsorship, or endorsement. Files are retained without path, color, or proportion edits and rendered with surrounding clear space.

| Provider | Asset used | First-party source | Usage guidance reviewed | SHA-256 |
| --- | --- | --- | --- | --- |
| Stripe | Slate wordmark from the official logo kit | https://stripe.com/newsroom/information | https://stripe.com/en-pl/legal/marks | `c243d6a693df3a3678a8353d89199d0c7fdb5efc7d93983dea77166c5ba75f36` |
| Paddle | Inverted wordmark SVG served by Paddle’s official site | https://www.paddle.com/press | Official press page; mark kept unchanged and isolated on a light field | `7890c7aa0fdf74babcbded6ab6dd2acf3a68d44564378042585a2f5f2db68698` |
| Lemon Squeezy | Official lemon mark SVG served by its site | https://www.lemonsqueezy.com/brand | Official brand page: preserve color, proportion, typography, and clear space | `c3d33485e7dda5dc487193d5aeb03d49de2b00a3b59757ab74921b4d3862d447` |
| Dodo Payments | Full-name light-background SVG | https://dodopayments.com/de/brand | Official brand page: preserve clear space; do not recolor, distort, rotate, or add effects | `6a66038721c30a63e94edb900a8325869bc2abc3564b64436b02815551a35957` |

The plain-text label beside the Lemon Squeezy symbol is editorial text, not a modified or recreated wordmark.
