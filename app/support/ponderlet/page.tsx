import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Ponderlet Support",
  description: "Get help with Ponderlet puzzles, saved progress, daily games, feedback, and privacy requests.",
  path: "/support/ponderlet",
});

const linkClass = "text-[color:var(--foreground)] underline underline-offset-4";
const headingClass = "text-xl font-semibold text-[color:var(--foreground)]";

export default function PonderletSupportPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="max-w-3xl pb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Ponderlet</p>
          <h1 className="mt-5 text-4xl font-semibold text-[color:var(--foreground)] sm:text-6xl">Support</h1>
          <p className="mt-6 text-base leading-7 text-[color:var(--muted-foreground)]">For help with Ponderlet, email <a className={linkClass} href={`mailto:${CONTACT_EMAIL}?subject=Ponderlet%20support`}>{CONTACT_EMAIL}</a>. Include the game and puzzle number, your app version, and what happened.</p>
          <div className="mt-10 grid gap-8 text-sm leading-7 text-[color:var(--muted-foreground)]">
            <section className="grid gap-3">
              <h2 className={headingClass}>Report a puzzle problem</h2>
              <p>Open Puzzle options, then Report a problem. Ponderlet includes the public puzzle identifier with your message. For general feedback, open Settings, then Send feedback.</p>
              <p>Submitting feedback requires a connection. If sending fails, your draft remains available for retry. You can also contact us directly by email. Please leave unnecessary personal or sensitive information out of your message.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Learn the games</h2>
              <p>Open a game&apos;s puzzle list and choose How to play for a short practice lesson. Practice uses a separate board. For small cells on a dense number or picture board, choose Enlarge to work on a smaller area.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Saved progress</h2>
              <p>Moves and results save on your device. Home&apos;s Continue action returns to your saved game. If the app reports a saving error, keep the app open and choose Retry saving before closing it.</p>
              <p>Removing the app or clearing its data removes local progress. Device backup and restore depend on your operating-system settings. Ponderlet has no account-based progress recovery service.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Daily puzzles</h2>
              <p>The Daily tab offers Nonogram, Futoshiki, and Block Puzzle. Daily Block&apos;s goal is 500 points. Daily results are separate from the fixed puzzle collection, and a game you resume stays attached to the date you started it.</p>
            </section>
            <section className="grid gap-3">
              <h2 className={headingClass}>Privacy and deletion requests</h2>
              <p>Read the <Link className={linkClass} href="/privacy/ponderlet">Ponderlet Privacy Policy</Link> for details about local saves and optional feedback. For a question or deletion request concerning a message you sent, email <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with its approximate date and enough information to locate it.</p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
