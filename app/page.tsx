import type { Metadata } from "next";
import { HomePortal } from "@/components/home/HomePortal";
import { SITE_DESCRIPTION } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Renowa Labs — AI-Powered Software Products",
  description: SITE_DESCRIPTION,
  path: "/",
  imageAlt: "Renowa Labs — AI-powered software products",
});

export default function Home() {
  return <HomePortal />;
}
