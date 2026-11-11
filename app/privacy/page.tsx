import Link from "next/link";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Notice",
  description: "How Renowa Labs handles information submitted through its website contact form.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="max-w-3xl pb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Privacy</p>
          <h1 className="mt-5 text-4xl font-semibold text-[color:var(--foreground)] sm:text-6xl">Website privacy notice</h1>
          <div className="mt-10 grid gap-8 text-sm leading-7 text-[color:var(--muted-foreground)]">
            <section>
              <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Ponderlet</h2>
              <p className="mt-3">
                For the Ponderlet mobile app and its optional feedback service, read the{" "}
                <Link className="text-[color:var(--foreground)] underline underline-offset-4" href="/privacy/ponderlet">Ponderlet Privacy Policy</Link>.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Website analytics</h2>
              <p className="mt-3">
                This website uses Google Analytics when enabled to understand page visits and interactions such as opening product pages, following external links, and selecting contact actions. Google may process browser, device, cookie, and network information under its own privacy terms. Contact-form names, email addresses, and message contents are excluded from the analytics events we send.
              </p>
              <p className="mt-3">
                You can control cookies through your browser settings. See{" "}
                <a className="text-[color:var(--foreground)] underline underline-offset-4" href="https://policies.google.com/privacy">Google&apos;s Privacy Policy</a> for its handling of analytics information.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Contact enquiries</h2>
              <p className="mt-3">
                When you use our contact form, Renowa Labs receives the name, email address, optional company, subject, and message you provide. We use this information to review and respond to your enquiry.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Delivery and abuse prevention</h2>
              <p className="mt-3">
                Contact messages are delivered through Brevo&apos;s SMTP service. The form also uses limited technical request information, rate limits, and a spam field to prevent repeated or automated submissions. We do not ask you to include sensitive information in a message.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Questions</h2>
              <p className="mt-3">
                For a privacy question or a request concerning information you submitted, email{" "}
                <TrackedLink
                  className="text-[color:var(--foreground)] underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                  eventName="email_click"
                  eventParams={{ link_text: CONTACT_EMAIL, location: "privacy" }}
                >
                  {CONTACT_EMAIL}
                </TrackedLink>
                . You can also return to the <Link className="text-[color:var(--foreground)] underline underline-offset-4" href="/contact">contact page</Link>.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
