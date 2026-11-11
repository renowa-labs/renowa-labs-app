import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Ponderlet Privacy Policy",
  description: "How Ponderlet handles local puzzle saves, optional feedback, support information, retention, and privacy requests.",
  path: "/privacy/ponderlet",
});

const linkClass = "text-[color:var(--foreground)] underline underline-offset-4";
const headingClass = "text-xl font-semibold text-[color:var(--foreground)]";

export default function PonderletPrivacyPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="max-w-3xl pb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Ponderlet</p>
          <h1 className="mt-5 text-4xl font-semibold text-[color:var(--foreground)] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-5 text-sm text-[color:var(--muted-foreground)]">Effective 11 November 2026</p>
          <div className="mt-10 grid gap-8 text-sm leading-7 text-[color:var(--muted-foreground)]">
            <section className="grid gap-3">
              <h2 className={headingClass}>About this policy</h2>
              <p>Renowa Labs provides Ponderlet. This policy explains how information is handled when you play Ponderlet or contact us about it. For privacy questions, contact <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
              <p>This policy covers the Ponderlet mobile app and support for it. Visits to the Renowa Labs website are covered by the separate <Link className={linkClass} href="/privacy">website privacy notice</Link>, including website analytics.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Playing Ponderlet</h2>
              <p>Ponderlet works without an account. Puzzle progress, saved boards, moves, notes, hints, scores, Daily results, preferences, and lesson progress are stored locally on your device. Ponderlet does not send saved boards or your full gameplay history to Renowa Labs during normal play.</p>
              <p>The app has no advertising or behavioral analytics SDK. It does not use an advertising identifier or track you across other companies&apos; apps and websites. It does not ask for access to your location, contacts, camera, photo library, or microphone.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Optional feedback</h2>
              <p>If you choose Send feedback or Report a problem and press Send, we receive your message, a randomly generated submission identifier, the app version, and the operating-system name and version. A problem report also includes the game name and its public puzzle identifier, such as the puzzle number, Daily date, or Block seed. The report does not attach your board, answers, photos, or full play history.</p>
              <p>The feedback service receives the IP address used to connect to it. Our application server converts that address into a keyed hash and stores the hash with the report and its receipt time. We use it to limit abusive submissions. A hash is a pseudonymous network identifier. Our hosting providers may also process connection information in their operational and security logs.</p>
              <p>Feedback is optional. Please include only information needed to explain your question or problem and avoid unnecessary personal or sensitive information. If you include personal information in the message, we receive that information with the message.</p>
              <p>Unsent feedback drafts are saved locally so you can return to them. After a successful send, the app clears the corresponding draft. Closing the composer before sending keeps the draft on your device.</p>
              <p>If you contact us by email, we receive the message and sender information supplied by your email service, which may include your name and email address.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>How we use information</h2>
              <p>We use support information to investigate feedback, fix reported problems, respond when contact details are available, and protect the feedback service from abuse. We do not sell support information, use it for targeted advertising, or share it with data brokers.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Service providers and disclosure</h2>
              <p>The feedback API runs on Heroku, a Salesforce service. Feedback submissions are stored using MongoDB Atlas. Our email service handles messages sent to our support address. We use these services for hosting, storage, security, and support. Their privacy and processing terms also apply to their services. We require service providers handling information on our behalf to provide at least the same protection described in this policy and required by applicable data-protection requirements.</p>
              <p>Service providers may process information in countries other than your own. We may disclose information where required by applicable law or where necessary to protect the service, its users, or legal rights.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Retention and deletion</h2>
              <p>Local progress and preferences remain until the app&apos;s data is removed. Your operating system may include app data in a device backup according to your device and backup settings. Deleting the app may leave a previously created backup.</p>
              <p>Submitted feedback is retained until it is manually deleted. The feedback service currently has no automatic deletion period. To request deletion or ask about information we hold, email <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Include the approximate date and enough of the message to help us locate it. Please avoid sending additional sensitive information.</p>
              <p>Removing the app does not remove feedback already sent to us. We may retain information where required for legal obligations or to handle an unresolved security or support matter.</p>
              <p>Depending on your location, you may have rights to request access, correction, restriction, or objection to processing of personal information. Contact us to exercise applicable rights. You may also have the right to raise a concern with your local data-protection authority.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Children</h2>
              <p>Ponderlet&apos;s puzzles can be played without providing personal information. A parent or guardian can contact us if a child has submitted personal information through feedback and ask for its deletion.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Security</h2>
              <p>The app sends feedback through HTTPS. Access to feedback storage is restricted to operating and supporting the service. Transmission and storage carry security risks despite these measures.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Changes and contact</h2>
              <p>We may update this policy when the app or our practices change. The effective date above identifies the latest version. For privacy questions and requests, contact <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
              <p>For help with the app, visit <Link className={linkClass} href="/support/ponderlet">Ponderlet Support</Link>.</p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
