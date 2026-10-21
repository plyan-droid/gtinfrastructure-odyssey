import { createFileRoute } from "@tanstack/react-router";
import { Showcase } from "@/components/showcase/Showcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Complex Systems. Clearer Insights. — StackOps Showcase" },
      { name: "description", content: "A cinematic scroll story exploring Elastic and Dynatrace observability capabilities. Unofficial prototype." },
      { property: "og:title", content: "Complex Systems. Clearer Insights. — StackOps Showcase" },
      { property: "og:description", content: "A cinematic scroll story exploring modern observability with Elastic and Dynatrace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Showcase,
});
