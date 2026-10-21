// All showcase copy lives here so it can be edited without touching animation code.
// Unofficial prototype: every service name, metric and dashboard is fictional.

export const opening = {
  eyebrow: "STACKOPS / OBSERVABILITY",
  headline: ["Complex Systems.", "Clearer Insights."],
  sub: "Modern digital services rely on connected applications, infrastructure and cloud environments. When something goes wrong, finding the cause isn't always straightforward.",
  secondary: "Explore how observability technologies help teams understand system behaviour and investigate operational issues.",
  offerings: ["Elastic", "Dynatrace"],
  offeringsNote: "Two observability offerings featured in this showcase",
  incidentLabel: "catalog-svc · unusual latency",
};

export const challenge = {
  eyebrow: "THE CHALLENGE",
  headline: ["When Something Breaks,", "Where Do You Look First?"],
  sub: "Operational data can be scattered across tools, applications and cloud environments, making troubleshooting more complicated.",
  items: [
    { n: "01", title: "Scattered Information", body: "Logs, metrics and monitoring data are spread across different systems." },
    { n: "02", title: "Unclear Causes", body: "A slow application may depend on many connected services." },
    { n: "03", title: "Manual Investigation", body: "Engineers spend time switching between tools and connecting information." },
  ],
  clusters: ["LOGS", "METRICS", "TRACES"],
};

export type Point = { n: string; title: string; body: string };
export type Section = { heading: string; body: string; links?: { label: string; href: string }[] };
export type Product = {
  id: "elastic" | "dynatrace";
  eyebrow: string;
  problem: string;
  problemSub: string;
  headline: string[];
  description: string;
  points: Point[];
  readMore: { title: string; sections: Section[] };
};

export const elastic: Product = {
  id: "elastic",
  eyebrow: "PRODUCT 01 / ELASTIC",
  problem: "Monitoring Data Everywhere. Answers Hard to Find?",
  problemSub: "When operational information is spread across multiple systems, engineers need ways to search, correlate and understand it.",
  headline: ["Turn Data", "Into Clarity."],
  description: "Elastic helps teams search, analyse and visualise logs, metrics and traces to understand application and infrastructure behaviour.",
  points: [
    { n: "01", title: "Bring Data Together", body: "Explore operational data from multiple supported sources." },
    { n: "02", title: "Search for Answers", body: "Find relevant events and logs during investigations." },
    { n: "03", title: "Follow Requests", body: "Use distributed tracing to investigate latency and errors." },
    { n: "04", title: "Visualise Performance", body: "Monitor trends and system behaviour with dashboards." },
    { n: "05", title: "Investigate with Context", body: "Connect related telemetry to narrow down possible causes." },
  ],
  readMore: {
    title: "Elastic — technical details",
    sections: [
      { heading: "What Elastic is", body: "Elastic is a search and analytics platform. Its observability capabilities help teams collect, store, search and visualise operational data from applications and infrastructure in one place." },
      { heading: "Logs, metrics and traces", body: "Logs record discrete events, metrics capture numeric measurements over time, and traces describe the path of a request through services. Viewing them together gives richer context than any single signal." },
      { heading: "Distributed tracing", body: "A trace is made of spans — one per service hop. Following spans across services helps engineers see where time is spent and where errors originate." },
      { heading: "Application performance monitoring", body: "APM agents and OpenTelemetry data report transaction latency, throughput and error rates, so teams can see which services and operations are degrading." },
      { heading: "Multi-cloud observability concepts", body: "Teams running workloads across several cloud environments and on-premises systems can bring that data into a shared view to compare behaviour and investigate issues consistently." },
      { heading: "Example incident investigation", body: "Illustrative only: latency rises on a fictional checkout flow. An engineer searches recent error logs, compares service latency metrics, opens a slow trace and sees most time spent in calls to inventory-db — a lead for further investigation." },
      {
        heading: "Relevant public documentation",
        body: "Official Elastic documentation for further reading.",
        links: [
          { label: "Elastic Observability docs", href: "https://www.elastic.co/docs/solutions/observability" },
          { label: "Elastic APM & distributed tracing", href: "https://www.elastic.co/docs/solutions/observability/apm" },
        ],
      },
    ],
  },
};

export const dynatrace: Product = {
  id: "dynatrace",
  eyebrow: "PRODUCT 02 / DYNATRACE",
  problem: "Too Many Alerts. Not Enough Answers?",
  problemSub: "When an application depends on multiple connected services, understanding the origin and impact of an issue can be challenging.",
  headline: ["From Visibility", "to Answers", "to Action."],
  description: "Dynatrace helps teams monitor application performance, understand service dependencies and investigate potential causes of issues with connected observability and AI-assisted analysis.",
  points: [
    { n: "01", title: "Monitor Performance", body: "Understand application health across supported environments." },
    { n: "02", title: "See Dependencies", body: "Visualise relationships between connected services." },
    { n: "03", title: "Trace Issues", body: "Follow application requests to investigate bottlenecks." },
    { n: "04", title: "Analyse Potential Causes", body: "Use AI-assisted analysis to support root-cause investigation." },
    { n: "05", title: "Support Faster Response", body: "Use contextual insights and supported automation to guide operational action." },
  ],
  readMore: {
    title: "Dynatrace — technical details",
    sections: [
      { heading: "What Dynatrace is", body: "Dynatrace is an observability platform that monitors applications, services and infrastructure, and helps teams understand performance and dependencies." },
      { heading: "Application performance monitoring", body: "APM tracks response times, throughput and error rates of applications so teams can spot degradation and its user impact." },
      { heading: "Service dependency mapping", body: "Smartscape is Dynatrace's automatically discovered topology map. It shows how applications, services, processes and hosts relate, making it easier to reason about the impact of an issue." },
      { heading: "Distributed tracing", body: "PurePath is Dynatrace's distributed tracing technology. It captures end-to-end traces of individual requests across services, linking slow or failing calls to the components involved." },
      { heading: "AI-assisted analysis", body: "Davis AI is Dynatrace's analysis engine. It correlates related events and topology to suggest likely root causes of problems. Results support — not replace — engineering judgement." },
      { heading: "Supported automation concepts", body: "Insights can trigger operational workflows such as notifications, ticket creation or supported remediation steps, helping teams respond consistently." },
      { heading: "Illustrative incident walkthrough", body: "Illustrative only: a fictional checkout transaction slows down. The dependency view shows checkout relies on catalog-svc and inventory-db. Traces show time concentrating in database calls, and the analysis panel flags increased query latency as a potential contributor for review." },
      {
        heading: "Relevant public documentation",
        body: "Official Dynatrace documentation for further reading.",
        links: [{ label: "Dynatrace documentation", href: "https://docs.dynatrace.com/docs" }],
      },
    ],
  },
};

export const elasticDemo = {
  eyebrow: "ELASTIC USE CASE · ILLUSTRATIVE",
  scenario: "A Digital Service Suddenly Becomes Slow",
  beforeTag: "BEFORE",
  beforeLabels: ["Multiple monitoring views", "Disconnected investigation", "Difficult to follow the request"],
  withTag: "WITH ELASTIC",
  query: 'service.name:"catalog-svc" AND event.outcome:failure',
  steps: [
    { k: "SEARCH", v: "Relevant logs and events" },
    { k: "METRICS", v: "Related performance metrics" },
    { k: "TRACE", v: "Follow a distributed trace" },
    { k: "FOCUS", v: "inventory-db appears to contribute to latency" },
  ],
  value: ["Find Relevant Signals.", "Investigate with More Context."],
  valueSub: "Connected observability data helps teams investigate where performance issues may originate.",
  note: "Illustrative workflow · fictional data · not a measured outcome",
};

export const dynatraceDemo = {
  eyebrow: "DYNATRACE USE CASE · ILLUSTRATIVE",
  scenario: "A Slow Service Affects a Digital Transaction",
  beforeTag: "BEFORE",
  beforeLabels: ["Performance degradation", "Multiple alerts", "Unclear dependencies"],
  withTag: "WITH DYNATRACE",
  steps: ["Affected application", "Dependent services", "Related latency", "AI-assisted analysis", "Possible contributor"],
  value: ["See the Dependencies.", "Investigate the Cause.", "Act with Better Context."],
  note: "Illustrative workflow · fictional data · not real analysis output",
};

export const aiAnalysis = {
  title: "AI-assisted analysis (fictional)",
  finding: "Potential contributor: increased database query latency.",
  confidence: "Review recommended. Additional investigation may be required.",
  next: "Related entity: inventory-db",
};

export const comparison = {
  eyebrow: "ILLUSTRATIVE WORKFLOW SCENARIO",
  headline: "Why Connected Observability Can Help",
  withoutTag: "WITHOUT A CONNECTED VIEW",
  withTag: "WITH CONNECTED OBSERVABILITY",
  rows: [
    { without: "Information may be spread across several tools.", with: "Related telemetry can be examined together." },
    { without: "Engineers manually correlate relevant signals.", with: "Traces help reveal request paths." },
    { without: "Dependencies can be harder to understand.", with: "Dependency views provide context." },
    { without: "Investigation involves navigating separate views.", with: "Teams can make better-informed troubleshooting decisions." },
  ],
};

export const closing = {
  headline: ["From Complexity", "to Clarity."],
  sub: "Explore how observability technologies help teams understand connected systems, investigate operational issues and make informed decisions.",
  options: [
    { id: "elastic" as const, name: "Elastic", body: "Search, analyse and visualise operational data." },
    { id: "dynatrace" as const, name: "Dynatrace", body: "Understand application performance and service dependencies." },
  ],
};

// QR: leave url null until a destination is approved; a placeholder is shown instead.
export const qr = {
  url: null as string | null,
  title: "Want to Explore the Technical Details?",
  sub: "Scan to explore the interactive experience.",
};

export const disclaimer =
  "Unofficial concept prototype. All services, metrics and dashboards are fictional and synthetic. Elastic and Dynatrace are shown as separate solutions; no integration between them is implied.";

// Site Map: `label` jumps to a story position; `panel` opens a Read More panel.
export type SiteMapEntry = { name: string; label?: string; panel?: "elastic" | "dynatrace" };
export const siteMap: SiteMapEntry[] = [
  { name: "StackOps Overview", label: "opening" },
  { name: "The Challenges", label: "challenge" },
  { name: "Elastic", label: "elastic" },
  { name: "Elastic Use Case", label: "elastic-demo" },
  { name: "Elastic Technical Details", panel: "elastic" },
  { name: "Dynatrace", label: "dyn" },
  { name: "Dynatrace Use Case", label: "dyn-demo" },
  { name: "Dynatrace Technical Details", panel: "dynatrace" },
  { name: "Explore Further", label: "closing" },
];

// Presentation Mode stops (timeline labels) and how long to hold each, in ms.
export const presentationStops: { label: string; hold: number }[] = [
  { label: "opening", hold: 6000 },
  { label: "incident", hold: 3500 },
  { label: "challenge", hold: 6000 },
  { label: "elastic", hold: 5000 },
  { label: "elastic-points", hold: 6000 },
  { label: "elastic-demo", hold: 4000 },
  { label: "elastic-value", hold: 5000 },
  { label: "dyn", hold: 5000 },
  { label: "dyn-points", hold: 6000 },
  { label: "dyn-demo", hold: 4000 },
  { label: "dyn-value", hold: 5000 },
  { label: "compare", hold: 6000 },
  { label: "closing", hold: 9000 },
];

// Optional modules — DISABLED. Placeholder copy only; not rendered or listed until product owners approve.
export const modules = {
  sora: {
    enabled: false,
    name: "SORA — StackOps Resiliency Accelerator",
    headline: "Less Manual Setup. More Time to Monitor.",
    steps: ["Discover monitoring gaps", "Review proposed configuration", "Deploy supported components", "View monitoring information"],
    readMore: "Placeholder — awaiting product-owner-approved details.",
  },
  soda: {
    enabled: false,
    name: "SODA — cost optimisation (placeholder)",
    headline: "Understand Your Infrastructure Spending.",
    problem: "Are your infrastructure resources configured efficiently?",
    steps: [
      "Collect relevant cost and configuration information",
      "Analyse resource utilisation",
      "Identify potential optimisation opportunities",
      "Review estimated savings, risks and suggested actions",
    ],
    syntheticNote: "All figures are synthetic. No savings have been achieved.",
    readMore: "Placeholder — awaiting approval for public use.",
  },
};
