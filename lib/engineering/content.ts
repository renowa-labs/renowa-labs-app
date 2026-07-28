import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const MIN_PUBLISHED_WORDS = 650;
const contentDirectory = path.join(process.cwd(), "content", "engineering");
const frontmatterDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

const articleFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(12).max(110),
  metaTitle: z.string().min(12).max(110).optional(),
  description: z.string().min(50).max(220),
  metaDescription: z.string().min(50).max(220).optional(),
  author: z.string().min(2).max(80),
  publishedAt: frontmatterDate,
  updatedAt: frontmatterDate,
  category: z.string().min(2).max(50).default("Engineering"),
  tags: z.array(z.string().min(2).max(40)).min(1),
  relatedProduct: z.string().nullable(),
  coverImage: z.string().startsWith("/"),
  canonicalUrl: z.url(),
  indexable: z.boolean(),
  status: z.enum(["draft", "published"]),
});

export type EngineeringArticle = z.infer<typeof articleFrontmatterSchema> & {
  content: string;
  wordCount: number;
  readingMinutes: number;
};

function countWords(content: string): number {
  return content
    .replace(/[`#>*_\-[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function readArticleFile(fileName: string): EngineeringArticle {
  const source = fs.readFileSync(path.join(contentDirectory, fileName), "utf8");
  const { data, content } = matter(source);
  const frontmatter = articleFrontmatterSchema.parse(data);
  const wordCount = countWords(content);

  if (frontmatter.status === "published" && frontmatter.indexable && wordCount < MIN_PUBLISHED_WORDS) {
    throw new Error(
      `Published engineering article "${frontmatter.slug}" has ${wordCount} words; at least ${MIN_PUBLISHED_WORDS} are required.`,
    );
  }

  return {
    ...frontmatter,
    content: content.trim(),
    wordCount,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
  };
}

export function getAllArticles(): EngineeringArticle[] {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readArticleFile)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPublishedArticles(): EngineeringArticle[] {
  return getAllArticles().filter((article) => article.status === "published" && article.indexable);
}

export function getPublishedArticle(slug: string): EngineeringArticle | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article: EngineeringArticle, limit = 3): EngineeringArticle[] {
  return getPublishedArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => article.tags.includes(tag)).length;
      const sameProduct = Boolean(article.relatedProduct && candidate.relatedProduct === article.relatedProduct);
      return { candidate, score: sharedTags + (sameProduct ? 3 : 0) };
    })
    .sort((a, b) => b.score - a.score || b.candidate.publishedAt.localeCompare(a.candidate.publishedAt))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function formatArticleDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
