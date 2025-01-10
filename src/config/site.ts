import { env } from "@/env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: "People Project Matrix",
  description: "Assignment: People Project Matrix Workflow",
  url:
    env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL,
  links: {
    github: "https://github.com/Jauharmuhammed/people-project-matrix",
  },
} as const;
