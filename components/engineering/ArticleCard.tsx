import Link from "next/link";
import type { EngineeringArticle } from "@/lib/engineering/content";
import { formatArticleDate } from "@/lib/engineering/content";

export function ArticleCard({ article }: { article: EngineeringArticle }) {
  return (
    <article className="flex h-full flex-col rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5 transition hover:border-[rgba(255,255,255,0.28)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        <span aria-hidden="true">/</span>
        <span>{article.readingMinutes} min read</span>
      </div>
      <h2 className="mt-5 text-xl font-semibold leading-tight text-[color:var(--foreground)]">
        <Link
          href={`/engineering/${article.slug}`}
          className="rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-4 flex-1 text-sm leading-7 text-[color:var(--muted-foreground)]">{article.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-[var(--border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/engineering/${article.slug}`}
        className="mt-7 inline-flex w-fit rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)] transition hover:text-[color:var(--muted-foreground)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        Read article
      </Link>
    </article>
  );
}
