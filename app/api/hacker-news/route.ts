const HACKER_NEWS_RSS_URL = "https://news.ycombinator.com/rss";
const MAX_ITEMS = 12;

type HackerNewsItem = {
  title: string;
  url: string;
  publishedAt: string | null;
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}

function readTag(source: string, tag: string) {
  const match = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function toIsoDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseHackerNewsRss(rss: string): HackerNewsItem[] {
  return Array.from(rss.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi))
    .slice(0, MAX_ITEMS)
    .map((match) => {
      const itemXml = match[1];
      const title = readTag(itemXml, "title");
      const link = readTag(itemXml, "link");
      const pubDate = readTag(itemXml, "pubDate");

      return {
        title,
        url: link,
        publishedAt: pubDate ? toIsoDate(pubDate) : null,
      };
    })
    .filter((item) => {
      if (!item.title || !item.url) {
        return false;
      }

      try {
        const url = new URL(item.url);
        return url.protocol === "https:";
      } catch {
        return false;
      }
    });
}

export async function GET() {
  try {
    const response = await fetch(HACKER_NEWS_RSS_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: {
        revalidate: 15 * 60,
      },
    });

    if (!response.ok) {
      return Response.json({ items: [] }, { status: 502 });
    }

    const rss = await response.text();
    return Response.json({
      items: parseHackerNewsRss(rss),
      source: HACKER_NEWS_RSS_URL,
    });
  } catch {
    return Response.json({ items: [] }, { status: 502 });
  }
}
