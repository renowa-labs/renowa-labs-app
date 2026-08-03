"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { trackEvent, type AnalyticsEventName, type AnalyticsParameters } from "@/lib/analytics";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  eventName: AnalyticsEventName;
  eventParams?: AnalyticsParameters;
  children: ReactNode;
};

export function TrackedLink({ href, eventName, eventParams, onClick, children, ...props }: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
