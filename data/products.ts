export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  status: string;
  platform: string;
  appStoreUrl: string;
  accent: string;
  featureHeading?: string;
  features: string[];
  year: string;
  icon: string;
  iconImage?: string;
  screenshotPlaceholder: string;
};

export const products = [
  {
    slug: "save-more-dreams",
    name: "Save More Dreams",
    shortDescription: "Take control of impulse spending. Pause, reflect, and save more.",
    longDescription:
      "Save helps you pause before impulse purchases and build smarter spending habits. When you feel the urge to buy something, Save guides you through a quick reflection, helping you understand why you want it, whether it aligns with your goals, and if it is truly worth it.",
    category: "Personal finance",
    status: "Live on App Store",
    platform: "iOS",
    appStoreUrl: "https://apps.apple.com/us/app/save-more-dreams/id6764151038",
    accent: "#ff6a00",
    featureHeading: "Pause before impulse purchases.",
    features: [
      "Pause any purchase and reflect before deciding",
      "Save items to your wishlist and revisit them later",
      "Set a personal savings goal and track daily progress",
      "See exactly how much money you've resisted spending",
      "Get daily reminders to keep your streak going",
    ],
    year: "2026",
    icon: "SMD",
    iconImage: "/products/save-more-dreams/icon.png",
    screenshotPlaceholder: "/products/save-more-dreams/icon.png",
  },
  {
    slug: "local-lens",
    name: "Local Lens",
    shortDescription: "A compact assistant for understanding local context faster.",
    longDescription:
      "Local Lens helps users make sense of places, tasks, and language in everyday workflows, with a calm interface built for quick decisions.",
    category: "Applied AI",
    status: "Shipped placeholder",
    platform: "iOS",
    appStoreUrl: "#", // TODO: Replace with the real App Store URL.
    accent: "#c9c9c3",
    features: [
      "Context-aware prompts",
      "Short answer mode",
      "Saved research snippets",
      "Mobile-first interaction patterns",
    ],
    year: "2025",
    icon: "LL",
    screenshotPlaceholder: "/brand/renowa-product-placeholder.svg",
  },
  {
    slug: "task-frame",
    name: "Task Frame",
    shortDescription: "Shape small projects into clear steps and useful outcomes.",
    longDescription:
      "Task Frame is a lightweight planning tool for turning loose ideas into practical scopes, milestones, and review points for small teams.",
    category: "Productivity",
    status: "Prototype placeholder",
    platform: "iOS",
    appStoreUrl: "#", // TODO: Replace with the real App Store URL.
    accent: "#b8b8b2",
    features: [
      "Goal-to-plan conversion",
      "Milestone outlines",
      "Review prompts",
      "Clean project snapshots",
    ],
    year: "2026",
    icon: "TF",
    screenshotPlaceholder: "/brand/renowa-product-placeholder.svg",
  },
] satisfies Product[];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string) {
  return products.filter((product) => product.slug !== slug).slice(0, 2);
}
