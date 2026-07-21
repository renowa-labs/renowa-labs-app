import { ContactForm } from "@/components/contact/ContactForm";
import { Footer } from "@/components/site/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Renowa Labs about product partnerships, applied AI, mobile applications, and software collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <main className="page-shell">
        <Container className="pb-20">
          <section className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-start">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--muted-foreground)]">Contact</p>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] text-[color:var(--foreground)] sm:text-6xl">
                Let&apos;s build something intelligent.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-sm leading-7 text-[color:var(--muted-foreground)]">
                Have a product idea, partnership, or applied software problem? Tell us what you are working on and we will respond from Renowa Labs.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {/* <a href={`mailto:${CONTACT_EMAIL}`} className={buttonClassName({ className: "w-full sm:w-auto" })}>
                  Email the lab
                </a> */}
                <ButtonLink href="/products" variant="secondary" className="w-full sm:w-auto">
                  Explore products
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-[color:var(--muted-foreground)]">{CONTACT_EMAIL}</p>
            </div>

            <ContactForm />
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
