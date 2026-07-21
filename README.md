# Renowa Labs portfolio

The canonical Renowa Labs website is `https://www.renowa-labs.com`. It is a Next.js App Router application with server-rendered product pages, a Markdown engineering publication, technical SEO endpoints, and a server-only contact delivery workflow.

## Local development

Use Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Useful verification commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Content architecture

- Product records live in `data/products.ts`. The typed `Product` model is the single source for cards, detail pages, structured data, related content, and sitemap inclusion.
- Engineering articles live in `content/engineering/*.md`. Frontmatter is validated with Zod in `lib/engineering/content.ts`.
- An engineering article is public only when both `status: published` and `indexable: true` are set. Public articles must also contain at least 650 words. Drafts do not receive routes through `generateStaticParams`, sitemap entries, or RSS entries.
- Product and article slugs are statically generated. Add or edit content in the data source rather than duplicating it inside page components.

Required engineering frontmatter:

```yaml
slug: example-article
title: A Specific and Descriptive Article Title
description: A unique summary long enough to explain the article accurately.
author: Renowa Labs Engineering
publishedAt: 2026-07-21
updatedAt: 2026-07-21
tags:
  - Product Engineering
relatedProduct: hirinq
coverImage: /og/renowa-og.svg
canonicalUrl: https://www.renowa-labs.com/engineering/example-article
indexable: false
status: draft
```

Write and review each article as original human-facing editorial content before publishing it. Do not turn a short AI-generated outline into an indexable page.

## Contact email through Brevo

The browser submits JSON to `/api/contact`; it never receives SMTP credentials and never talks to Brevo directly. The route validates again on the server, applies body-size, honeypot, rate, and repeat-submission controls, then uses Nodemailer through `lib/email/contact-mailer.ts`.

Brevo setup:

1. Add the `renowa-labs.com` sending domain in Brevo and complete its DNS authentication instructions.
2. Verify the exact `CONTACT_FROM_EMAIL` sender if Brevo requires individual sender verification.
3. In Brevo, create an SMTP key for this website. Do not use a Brevo account password.
4. Copy `.env.example` to `.env.local` for local work, or add the same variables in the production hosting environment.
5. Set `BREVO_SMTP_USER` to the Brevo SMTP login and `BREVO_SMTP_PASSWORD` to the generated SMTP key.
6. Keep `BREVO_SMTP_HOST=smtp-relay.brevo.com` and use port `587` for STARTTLS or `465` for implicit TLS.
7. Set `CONTACT_FROM_EMAIL` to the verified Renowa Labs sender and `CONTACT_TO_EMAIL=info@renowa-labs.com`.
8. Redeploy after setting production variables, submit the contact form, and confirm receipt, the `[Renowa Labs Contact]` subject, and that Reply sends to the visitor.

The in-process rate limiter is useful baseline protection. On multi-instance or high-volume production hosting, replace its storage with a shared managed store while keeping the same server-only boundary.

## Search and crawler endpoints

- `/robots.txt` allows public pages and explicitly allows `OAI-SearchBot`; `GPTBot` is disallowed. This intentionally separates search discovery from model-training crawling.
- `/sitemap.xml` includes public routes, indexable products, and published/indexable engineering articles only.
- `/rss.xml` publishes the same approved engineering articles.
- Canonical metadata uses the `www` origin on every route.
- `next.config.ts` permanently redirects requests whose host is `renowa-labs.com` to `www.renowa-labs.com`.
- Organization, SoftwareApplication, Article, and Breadcrumb JSON-LD are generated only from known site data. No review, rating, offer, price, version, or social profile claims are invented.

After the production domain is live:

1. Add and verify the `https://www.renowa-labs.com` URL-prefix or domain property in Google Search Console.
2. Submit `https://www.renowa-labs.com/sitemap.xml` and inspect the home page, each product, and each published engineering article.
3. Add the canonical domain in Bing Webmaster Tools, import or verify ownership, and submit the same sitemap.
4. Confirm the platform-level apex-to-`www` redirect and ensure both HTTP and HTTPS variants resolve to the canonical URL in one permanent redirect.
5. Test structured data with Google Rich Results Test and Schema.org Validator after deployment.
6. Recheck page indexing whenever a draft is promoted or a product's `indexable` flag changes.

No analytics provider is installed in this repository. Add one only with an explicit privacy and consent decision.

## Optional IndexNow submission

IndexNow is disabled outside production and never runs automatically during local development. To enable its authenticated server-side trigger, generate two different random values:

- `INDEXNOW_KEY`: 8–128 letters, numbers, or hyphens; this protocol verification key is intentionally exposed at `/indexnow-key.txt` in production.
- `INDEXNOW_SECRET`: at least 24 characters; this remains private and authorizes `/api/indexnow`.

Then submit canonical Renowa Labs URLs from a trusted deployment workflow:

```bash
curl -X POST https://www.renowa-labs.com/api/indexnow \
  -H "Authorization: Bearer $INDEXNOW_SECRET" \
  -H "Content-Type: application/json" \
  --data '{"urls":["https://www.renowa-labs.com/products/hirinq"]}'
```

Never put `INDEXNOW_SECRET`, Brevo credentials, or SMTP configuration in a `NEXT_PUBLIC_` variable.

## Deployment notes

The application requires a Node.js runtime for the contact and IndexNow route handlers and filesystem access to the bundled Markdown content at build/runtime. Deploy the build output with all environment variables configured on the server. SMTP egress to Brevo must be allowed by the hosting provider. The contact mailer has explicit connection, socket, and overall delivery timeouts and returns a retry-safe public error without logging message contents or credentials.
