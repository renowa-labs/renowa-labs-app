import type { Metadata } from "next";
import { HomePortal } from "@/components/home/HomePortal";
import { SITE_DESCRIPTION } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products for Humans and AI",
  description: SITE_DESCRIPTION,
  path: "/",
  imageAlt: "Renowa Labs — products that make humans' and AIs' lives easier",
});

export default function Home() {
  return <HomePortal />;
}
