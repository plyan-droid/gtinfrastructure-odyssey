import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "@/components/showcase/Showcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StackOps — Observability. Reimagined." },
      { name: "description", content: "Explore GovTech’s Whole-of-Government observability offering, operational capabilities and official agency customer stories." },
      { property: "og:title", content: "StackOps — Observability. Reimagined." },
      { property: "og:description", content: "A continuous journey through StackOps visibility, incident investigation, supporting tools and agency impact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Showcase,
});
