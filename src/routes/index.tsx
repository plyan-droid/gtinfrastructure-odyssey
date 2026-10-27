import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "@/components/showcase/Showcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StackOps — More Than Monitoring. Built for Government." },
      {
        name: "description",
        content:
          "Explore government-ready monitoring foundations, supported automation, operational insights and verified agency outcomes with StackOps.",
      },
      { property: "og:title", content: "StackOps — More Than Monitoring. Built for Government." },
      {
        property: "og:description",
        content:
          "A continuous journey through StackOps visibility, incident investigation, supporting tools and agency impact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Showcase,
});
