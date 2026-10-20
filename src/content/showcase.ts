// All showcase copy lives here so it can be edited without touching animation code.
// Unofficial prototype: every service name, metric and dashboard is fictional.

export const opening = {
  headline: ["Observability.", "Reimagined."],
  sub: "Discover how modern observability helps teams understand, investigate and optimise complex digital services.",
};

export type Point = { n: string; title: string; body: string };
export type Product = {
  id: "elastic" | "dynatrace";
  eyebrow: string;
  headline: string[];
  description: string;
  points: Point[];
  readMore: { title: string; sections: { heading: string; body: string }[] };
};

export const elastic: Product = {
  id: "elastic",
  eyebrow: "PRODUCT 01 / ELASTIC",
  headline: ["Turn Data", "Into Clarity."],
  description: "Bring logs, metrics and traces together to better understand your applications and infrastructure.",
  points: [
    { n: "01", title: "Unified Visibility", body: "Explore operational data across services and cloud environments." },
    { n: "02", title: "Connected Tracing", body: "Follow requests across services to investigate latency and errors." },
    { n: "03", title: "Faster Investigation", body: "Search, correlate and visualise monitoring data to identify potential issues." },
  ],
  readMore: {
    title: "Elastic — an overview",
    sections: [
      { heading: "What Elastic is", body: "Elastic is a search and analytics platform. Its observability capabilities help teams collect, store, search and visualise operational data from applications and infrastructure in one place." },
      { heading: "Logs, metrics and traces", body: "Logs record discrete events, metrics capture numeric measurements over time, and traces describe the path of a request through services. Viewing them together gives richer context than any single signal." },
      { heading: "Distributed tracing", body: "A trace is made of spans — one per service hop. Following spans across services helps engineers see where time is spent and where errors originate." },
      { heading: "Multi-cloud observability", body: "Teams running workloads across several cloud environments and on-premises systems can bring that data into a shared view to compare behaviour and investigate issues consistently." },
    ],
  },
};

export const dynatrace: Product = {
  id: "dynatrace",
  eyebrow: "PRODUCT 02 / DYNATRACE",
  headline: ["See More.", "Understand Faster.", "Act with Confidence."],
  description: "Connect application performance insights with AI-assisted analysis and operational workflows.",
  points: [
    { n: "01", title: "Full-Stack Observability", body: "Understand application performance and dependencies across supported environments." },
    { n: "02", title: "AI-Assisted Root-Cause Analysis", body: "Connect signals and identify likely causes of application issues." },
    { n: "03", title: "Smarter Operations", body: "Support faster incident response through contextual insights and automation." },
  ],
  readMore: {
    title: "Dynatrace — an overview",
    sections: [
      { heading: "What Dynatrace does", body: "Dynatrace is an observability platform that monitors applications, services and infrastructure, and helps teams understand performance and dependencies." },
      { heading: "Application performance monitoring", body: "APM tracks response times, throughput and error rates of applications so teams can spot degradation and its user impact." },
      { heading: "Service dependency mapping", body: "Automatically discovered maps show how services, processes and hosts relate, making it easier to reason about the blast radius of an issue." },
      { heading: "Distributed tracing", body: "End-to-end traces follow individual requests across services, linking slow or failing calls to the components involved." },
      { heading: "AI-assisted analysis", body: "Analysis capabilities correlate related signals and suggest likely root causes. Results support — not replace — engineering judgement." },
      { heading: "Workflow automation", body: "Insights can trigger operational workflows such as notifications or ticket creation, helping teams respond consistently." },
    ],
  },
};

export const closing = {
  headline: ["From Signals to Insights.", "From Insights to Action."],
  sub: "Explore the technologies helping teams understand complex digital environments.",
  qrLabel: "Scan to Explore More",
};

export const disclaimer =
  "Unofficial design prototype. All services, metrics and dashboards are fictional. Elastic and Dynatrace are shown as separate solutions; no integration between them is implied.";

export const aiAnalysis = {
  title: "AI-assisted analysis",
  finding: "Likely contributor: inventory-db slow queries",
  confidence: "Confidence: moderate — review recommended",
  next: "Suggested next step: inspect query latency on inventory-db",
};
