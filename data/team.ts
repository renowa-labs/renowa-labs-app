export type TeamMember = {
  name: string;
  role: string;
  description: string;
  initials: string;
  link: string;
};

export const team = [
  {
    name: "Founder Name",
    role: "Product and engineering",
    description: "Shapes product direction, prototypes, and release quality.",
    initials: "FN",
    link: "#",
  },
  {
    name: "Design Lead",
    role: "Interface and brand systems",
    description: "Builds calm interfaces and visual systems for shipped products.",
    initials: "DL",
    link: "#",
  },
  {
    name: "AI Engineer",
    role: "Applied intelligence",
    description: "Turns model capability into reliable product behavior.",
    initials: "AI",
    link: "#",
  },
] satisfies TeamMember[];
