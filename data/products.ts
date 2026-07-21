export type Product = {
  slug: string;
  name: string;
  tagline?: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  tags?: string[];
  status: string;
  platform: string;
  appStoreUrl: string;
  launchUrl?: string;
  launchLabel?: string;
  launchIcon?: "app-store" | "none";
  accent: string;
  featureHeading?: string;
  features: string[];
  year: string;
  icon: string;
  iconImage?: string;
  screenshotPlaceholder: string;
  preview?: {
    frame: "mobile" | "web";
    eyebrow: string;
    heading: string;
    description: string;
    videoUrl?: string;
    posterImage?: string;
    caption?: string;
    steps: string[];
  };
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
    preview: {
      frame: "mobile",
      eyebrow: "Video preview",
      heading: "A calmer purchase pause, shown step by step.",
      description:
        "Use this section for a short product walkthrough. For mobile apps, the preview appears inside a phone-shaped frame so the experience feels native to the product.",
      posterImage: "/products/save-more-dreams/icon.png",
      caption: "Preview slot for the Save More Dreams walkthrough.",
      steps: ["Open the pause flow", "Reflect before buying", "Track the money kept"],
    },
  },
  {
    slug: "justforhack",
    name: "JustForHack",
    shortDescription: "Level up your hacking skills with real-world CTF challenges, competitive races, and community leaderboards.",
    longDescription:
      "JustForHack is a free, community-driven cybersecurity learning platform built for hackers of all levels. Practice across Web Exploitation, Cryptography, Forensics, Binary, OSINT, and Networking, earn XP and badges for every solve, then put your skills to the test in timed competitions and head-to-head races.",
    category: "Cybersecurity",
    status: "Live",
    platform: "Web",
    appStoreUrl: "https://www.justforhack.com/",
    launchUrl: "https://www.justforhack.com/",
    launchLabel: "Start competing",
    launchIcon: "none",
    accent: "#03d16e",
    featureHeading: "Learn while you hack.",
    features: [
      "Solve real-world CTF challenges across six security categories",
      "Compete in timed events and head-to-head CTF races",
      "Earn XP, coins, and badges as your skills grow",
      "Climb individual and team leaderboards",
      "Learn with beginner guides, tutorials, and walkthroughs",
      "Join a community built for security researchers",
    ],
    year: "2026",
    icon: "JFH",
    iconImage: "/products/justforhack/logo.png",
    screenshotPlaceholder: "/products/justforhack/logo.png",
  },
  {
    slug: "hirinq",
    name: "Hirinq",
    tagline: "A smarter way to discover your next opportunity.",
    shortDescription:
      "An AI-powered, mobile-first job discovery platform that helps candidates find relevant opportunities without navigating endless vacancy lists. Hirinq brings jobs from multiple sources into one personalized experience, making discovery, saving, and applying faster and simpler.",
    longDescription: [
      "Hirinq reimagines job searching with a mobile-first discovery experience. Instead of browsing through long and repetitive vacancy lists, candidates can quickly explore relevant opportunities, save jobs they are interested in, and apply using the most suitable application method.",
      "Behind the experience, Hirinq collects and structures vacancies from multiple sources, removes duplicate listings, and uses intelligent matching to connect candidates with roles that better fit their skills, preferences, and career goals.",
      "The platform is initially being developed for the Azerbaijani job market, with a broader vision of creating a modern and scalable recruitment experience for international markets.",
    ].join("\n\n"),
    category: "Recruitment",
    tags: ["AI", "Recruitment", "Mobile"],
    status: "Coming Soon",
    platform: "Mobile App",
    appStoreUrl: "https://hirinq.ai/",
    launchUrl: "https://hirinq.ai/",
    launchLabel: "Explore Hirinq",
    launchIcon: "none",
    accent: "#4f46ef",
    featureHeading: "Job discovery, shaped around the candidate.",
    features: [
      "Personalized job recommendations",
      "Fast, swipe-based vacancy discovery",
      "Vacancies from multiple trusted sources",
      "Intelligent duplicate detection",
      "Saved jobs and application tracking",
      "Direct, email, and external application options",
      "A mobile-first candidate experience",
    ],
    year: "2026",
    icon: "H",
    iconImage: "/products/hirinq/hirinq-mark.svg",
    screenshotPlaceholder: "/products/hirinq/hirinq-mark.svg",
  },
  // {
  //   slug: "task-frame",
  //   name: "Task Frame",
  //   shortDescription: "Shape small projects into clear steps and useful outcomes.",
  //   longDescription:
  //     "Task Frame is a lightweight planning tool for turning loose ideas into practical scopes, milestones, and review points for small teams.",
  //   category: "Productivity",
  //   status: "Prototype placeholder",
  //   platform: "iOS",
  //   appStoreUrl: "#", // TODO: Replace with the real App Store URL.
  //   accent: "#b8b8b2",
  //   features: [
  //     "Goal-to-plan conversion",
  //     "Milestone outlines",
  //     "Review prompts",
  //     "Clean project snapshots",
  //   ],
  //   year: "2026",
  //   icon: "TF",
  //   screenshotPlaceholder: "/brand/renowa-product-placeholder.svg",
  //   preview: {
  //     frame: "web",
  //     eyebrow: "Video preview",
  //     heading: "A flexible frame for web products and desktop tools.",
  //     description:
  //       "Website and web-app products use a wider browser-style preview, while mobile apps can keep the phone frame. The content is controlled per product.",
  //     posterImage: "/brand/renowa-product-placeholder.svg",
  //     caption: "Preview slot for Task Frame.",
  //     steps: ["Shape the task", "Review milestones", "Share the snapshot"],
  //   },
  // },
] satisfies Product[];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string): Product[] {
  return products.filter((product) => product.slug !== slug).slice(0, 2);
}
