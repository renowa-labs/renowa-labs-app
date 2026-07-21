export type ProductPreview = {
  frame: "mobile" | "web";
  eyebrow: string;
  heading: string;
  description: string;
  videoUrl?: string;
  posterImage?: string;
  caption?: string;
  steps: string[];
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  name: string;
  domain: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  status: string;
  category: string;
  year: string;
  platforms: string[];
  features: string[];
  problem: string;
  solution: string;
  audience: string[];
  images: ProductImage[];
  logo: string;
  relatedArticles: string[];
  externalUrl: string;
  publishedAt: string | null;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  indexable: boolean;
  accent: string;
  cardTags?: string[];
  icon: string;
  featureHeading?: string;
  launchLabel?: string;
  launchIcon?: "app-store" | "none";
  preview?: ProductPreview;
};

export const products = [
  {
    slug: "save-more-dreams",
    name: "Save More Dreams",
    domain: "https://apps.apple.com/us/app/save-more-dreams/id6764151038",
    tagline: "Pause, reflect, and save more.",
    shortDescription: "Take control of impulse spending and build more intentional purchase habits.",
    fullDescription:
      "Save More Dreams helps people pause before impulse purchases and build smarter spending habits. When the urge to buy appears, the app guides the user through a short reflection on why they want the item, whether it supports their goals, and whether the purchase is truly worth it.",
    status: "Live on App Store",
    category: "Personal Finance",
    year: "2026",
    platforms: ["iOS"],
    features: [
      "Pause a purchase and reflect before deciding",
      "Save items to a wishlist and revisit them later",
      "Set a personal savings goal and track daily progress",
      "See how much spending has been resisted",
      "Use daily reminders to maintain a saving streak",
    ],
    problem: "Impulse purchases can work against longer-term financial goals before there is time to reflect.",
    solution: "A calm, structured pause helps users reconsider purchases and keep progress visible.",
    audience: ["People building healthier spending habits", "Goal-oriented savers"],
    images: [
      {
        src: "/products/save-more-dreams/icon.png",
        alt: "Save More Dreams app icon",
        width: 1024,
        height: 1024,
      },
    ],
    logo: "/products/save-more-dreams/icon.png",
    relatedArticles: [],
    externalUrl: "https://apps.apple.com/us/app/save-more-dreams/id6764151038",
    publishedAt: null,
    updatedAt: "2026-07-21",
    seoTitle: "Save More Dreams — Intentional Spending App",
    seoDescription:
      "Save More Dreams is an iOS app by Renowa Labs that helps people pause impulse purchases and build more intentional saving habits.",
    indexable: true,
    accent: "#ff6a00",
    icon: "SMD",
    featureHeading: "Pause before impulse purchases.",
    launchLabel: "Open App Store",
    launchIcon: "app-store",
  },
  {
    slug: "justforhack",
    name: "JustForHack",
    domain: "https://www.justforhack.com/",
    tagline: "Level up your hacking skills.",
    shortDescription:
      "A cybersecurity learning platform with real-world CTF challenges, competitive races, and community leaderboards.",
    fullDescription:
      "JustForHack is a free, community-driven cybersecurity learning platform built for hackers of all levels. Participants can practise across Web Exploitation, Cryptography, Forensics, Binary, OSINT, and Networking, earn XP and badges for each solve, and put their skills to the test in timed competitions and head-to-head races.",
    status: "Live",
    category: "Cybersecurity",
    year: "2026",
    platforms: ["Web"],
    features: [
      "Real-world CTF challenges across six security categories",
      "Timed events and head-to-head CTF races",
      "XP, coins, and badges that reflect progress",
      "Individual and team leaderboards",
      "Beginner guides, tutorials, and walkthroughs",
      "A community for security researchers",
    ],
    problem: "Security learners need a practical way to build skills and measure progress beyond passive tutorials.",
    solution: "Hands-on challenges, competitive modes, and visible progression turn security concepts into repeatable practice.",
    audience: ["Cybersecurity learners", "Security researchers", "CTF competitors"],
    images: [
      {
        src: "/products/justforhack/logo.png",
        alt: "JustForHack cybersecurity platform logo",
        width: 500,
        height: 500,
      },
    ],
    logo: "/products/justforhack/logo.png",
    relatedArticles: [],
    externalUrl: "https://www.justforhack.com/",
    publishedAt: null,
    updatedAt: "2026-07-21",
    seoTitle: "JustForHack — Cybersecurity CTF Platform",
    seoDescription:
      "JustForHack is a cybersecurity learning platform with CTF challenges, competitive races, progression, and community leaderboards.",
    indexable: true,
    accent: "#03d16e",
    icon: "JFH",
    featureHeading: "Learn while you hack.",
    launchLabel: "Start competing",
    launchIcon: "none",
  },
  {
    slug: "hirinq",
    name: "Hirinq",
    domain: "https://hirinq.ai",
    tagline: "A smarter way to discover your next opportunity.",
    shortDescription:
      "Hirinq is an AI-powered job discovery product that brings vacancies from multiple sources into one personalized experience, helping candidates discover, save and apply for relevant opportunities more easily.",
    fullDescription:
      "Hirinq is reimagining how people discover job opportunities. Instead of forcing candidates to search across multiple platforms and navigate repetitive vacancy lists, Hirinq brings relevant opportunities together in one intelligent and personalized product experience. Candidates can explore jobs, save opportunities, track their activity and apply through the most appropriate application method. Hirinq is initially being developed for the Azerbaijani job market.",
    status: "Coming Soon",
    category: "Recruitment Technology",
    year: "2026",
    platforms: ["Web", "Mobile"],
    features: [
      "Personalized job discovery",
      "Vacancy aggregation from trusted sources",
      "Intelligent duplicate detection",
      "Saved opportunities",
      "Application activity tracking",
      "Direct, email and external application flows",
      "Mobile-first product experience",
    ],
    problem: "Candidates often repeat the same search across fragmented job sources and encounter duplicated vacancy listings.",
    solution:
      "Hirinq brings relevant opportunities into one personalized candidate experience for discovery, saving, activity tracking, and applying.",
    audience: ["Job candidates in Azerbaijan", "People seeking a faster, more relevant job discovery experience"],
    images: [
      {
        src: "/products/hirinq/hirinq-mark.svg",
        alt: "Hirinq recruitment technology product mark",
        width: 490,
        height: 475,
      },
    ],
    logo: "/products/hirinq/hirinq-mark.svg",
    relatedArticles: [
      "detecting-duplicate-jobs-across-platforms",
      "mobile-first-job-discovery-azerbaijan",
    ],
    externalUrl: "https://hirinq.ai",
    publishedAt: null,
    updatedAt: "2026-07-21",
    seoTitle: "Hirinq — AI-Powered Job Discovery Product",
    seoDescription:
      "Hirinq is a coming-soon AI-powered job discovery product that brings relevant vacancies into one personalized experience for candidates.",
    indexable: true,
    accent: "#4f46ef",
    cardTags: ["AI", "Recruitment", "Mobile"],
    icon: "H",
    featureHeading: "Job discovery, shaped around the candidate.",
    launchLabel: "Explore Hirinq",
    launchIcon: "none",
  },
] satisfies Product[];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getIndexableProducts(): Product[] {
  return products.filter((product) => product.indexable);
}

export function getRelatedProducts(slug: string): Product[] {
  return getIndexableProducts().filter((product) => product.slug !== slug).slice(0, 2);
}
