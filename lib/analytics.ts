"use client";

import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsEventName =
  | "generate_lead"
  | "email_click"
  | "contact_cta_click"
  | "product_click"
  | "outbound_product_click";

export type AnalyticsParameters = Partial<
  Record<"form_name" | "method" | "link_text" | "location" | "cta_text" | "product_name" | "destination", string>
>;

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function trackEvent(eventName: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (!gaId || typeof window === "undefined") {
    return;
  }

  sendGAEvent("event", eventName, parameters);
}
