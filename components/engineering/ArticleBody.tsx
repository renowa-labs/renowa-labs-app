import ReactMarkdown from "react-markdown";

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="engineering-article max-w-3xl">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-12 text-2xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-semibold leading-tight text-[color:var(--foreground)]">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-5 text-pretty text-sm leading-7 text-[color:var(--muted-foreground)] sm:text-[15px]">
              {children}
            </p>
          ),
          ul: ({ children }) => <ul className="mt-5 grid list-disc gap-3 pl-5 text-sm leading-7 text-[color:var(--muted-foreground)]">{children}</ul>,
          ol: ({ children }) => (
            <ol className="mt-5 grid list-decimal gap-3 pl-5 text-sm leading-7 text-[color:var(--muted-foreground)]">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1 marker:text-[color:var(--foreground)]">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[color:var(--foreground)] underline decoration-[var(--border)] underline-offset-4 transition hover:opacity-70"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold text-[color:var(--foreground)]">{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l border-[var(--foreground)] pl-5 text-[color:var(--muted-foreground)]">{children}</blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded-sm bg-[var(--surface)] px-1.5 py-0.5 text-[0.92em] text-[color:var(--foreground)]">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="mt-6 overflow-x-auto rounded-[6px] border border-[var(--border)] bg-[var(--muted)] p-4 text-xs leading-6 text-[color:var(--foreground)]">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
