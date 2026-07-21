import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/data/site";
import { getIndexNowEnvironment } from "@/lib/indexnow/config";

export const runtime = "nodejs";

function authorized(request: Request, secret: string) {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const expectedBuffer = Buffer.from(secret);
  const suppliedBuffer = Buffer.from(supplied);
  return suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ok: false, message: "IndexNow is disabled outside production." }, { status: 404 });
  }

  const environment = getIndexNowEnvironment();
  if (!environment.success) {
    return NextResponse.json({ ok: false, message: "IndexNow is not configured." }, { status: 503 });
  }

  if (!authorized(request, environment.data.INDEXNOW_SECRET)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let requestedUrls: unknown;
  try {
    requestedUrls = (await request.json() as { urls?: unknown }).urls;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(requestedUrls) || requestedUrls.length < 1 || requestedUrls.length > 100) {
    return NextResponse.json({ ok: false, message: "Provide between 1 and 100 canonical URLs." }, { status: 400 });
  }

  const canonicalOrigin = new URL(SITE_URL).origin;
  const urlList: string[] = [];

  try {
    for (const value of requestedUrls) {
      if (typeof value !== "string") throw new Error("Invalid URL");
      const url = new URL(value, SITE_URL);
      if (url.origin !== canonicalOrigin || url.username || url.password || url.hash) throw new Error("Invalid URL");
      urlList.push(url.toString());
    }
  } catch {
    return NextResponse.json({ ok: false, message: "Every URL must use the canonical Renowa Labs origin." }, { status: 400 });
  }

  const result = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: environment.data.INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/indexnow-key.txt`,
      urlList,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  if (!result.ok) {
    console.error("IndexNow submission failed", { status: result.status });
    return NextResponse.json({ ok: false, message: "IndexNow did not accept the submission." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, submitted: urlList.length });
}

