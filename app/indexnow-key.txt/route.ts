import { getIndexNowEnvironment } from "@/lib/indexnow/config";

export function GET() {
  const environment = getIndexNowEnvironment();
  if (!environment.success || process.env.NODE_ENV !== "production") {
    return new Response("Not found", { status: 404 });
  }

  return new Response(environment.data.INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

