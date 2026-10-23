// All visitor-facing showcase copy and evidence live here. Demonstrations use fictional infrastructure.
export type Point = { n: string; title: string; body: string };
export type Section = { heading: string; body: string; links?: { label: string; href: string }[] };
export type Detail = { id: string; eyebrow: string; readMore: { title: string; sections: Section[] } };
export type Product = Detail & { problem: string; problemSub: string; headline: string[]; description: string; points: Point[] };
export type TechnologyOption = Product;
export const sources = {
  stories: "https://www.developer.tech.gov.sg/products/categories/devops/stackops/customer-stories",
  positioning: "https://govinsider.asia/intl-en/article/how-govtech-singapores-stackops-enhances-observability-in-public-sector-it",
};
export const ui = {
  readMore: "Read more", siteMap: "Site Map", start: "Scroll to begin", close: "Close",
  brand: "StackOps", pricing: "Pricing details to be confirmed", optionScope: "Capabilities, operating models and adoption details depend on the selected option and agency requirements. Confirm these with the StackOps team.",
  source: "Official customer story", attributed: "Reported in the official StackOps customer story", storySection: "Customer stories", storyNumber: "Story", previous: "Previous customer story", next: "Next customer story",
  technologyMore: "Technical details", toolsNote: "Scope, availability and supported technology options to be confirmed.", toolsBuilt: "Built by StackOps", explore: "Explore StackOps",
};
export const diagram = {
  analytics: "MONITORING INSIGHTS", telemetry: "logs · metrics · traces", latency: "latency ↑", response: "response time ↑", spans: "slow spans · trace 7c2e…", query: "query latency ↑",
  paths: ["VISIBILITY", "RELIABILITY"], fragmented: ["logs-view", "metrics-view", "trace-view"],
};
export const opening = {
  eyebrow: "STACKOPS / WHOLE-OF-GOVERNMENT OBSERVABILITY",
  headline: ["Observability.", "Reimagined."],
  sub: "Helping government agencies understand, monitor and improve the reliability of their digital services.",
  secondary: "GovTech’s Whole-of-Government observability offering.",
};
export const challenge = {
  eyebrow: "THE CHALLENGE", headline: ["Complex Systems.", "Fragmented Visibility."],
  sub: "As digital services become more interconnected, understanding system health and investigating issues becomes increasingly complex.",
  items: [
    { n: "01", title: "Fragmented monitoring information", body: "Operational signals are spread across separate views." },
    { n: "02", title: "Increasing system complexity", body: "Applications and infrastructure rely on more connected components." },
    { n: "03", title: "Difficult incident investigation", body: "Engineers need context to narrow down possible causes." },
    { n: "04", title: "Limited end-to-end visibility", body: "Interconnected services can be hard to follow." },
  ],
};
export const capabilities: Product = {
  id: "capabilities", eyebrow: "STACKOPS CAPABILITIES", problem: "", problemSub: "", headline: ["See the", "Bigger Picture."],
  description: "Bring operational insights together to better understand applications, infrastructure and the digital services they support.",
  points: [
    { n: "01", title: "Operational Visibility", body: "Understand application and infrastructure health." },
    { n: "02", title: "Logs, Metrics and Traces", body: "Use different types of telemetry to understand system behaviour." },
    { n: "03", title: "Application Performance", body: "Gain insights into service performance and operational health." },
    { n: "04", title: "Incident Investigation", body: "Support troubleshooting and root-cause analysis." },
    { n: "05", title: "Shared Monitoring Insights", body: "Collaborate through appropriate access to monitoring information." },
  ],
  readMore: { title: "See the bigger picture with StackOps", sections: [
    { heading: "Whole-of-Government observability", body: "StackOps is GovTech’s Whole-of-Government observability offering. It helps agencies monitor applications and infrastructure, understand operational data and investigate issues that can affect digital service reliability." },
    { heading: "Logs, metrics and traces", body: "Logs record events; metrics measure behaviour over time; traces follow requests across connected services. Examining related signals gives engineers richer operational context." },
    { heading: "Performance and incident investigation", body: "Monitoring dashboards and application performance information help teams identify abnormal behaviour, investigate dependencies and narrow down potential causes. Observability supports engineering judgement; it does not guarantee diagnosis or resolution." },
    { heading: "Shared insights, appropriate access", body: "Access to relevant monitoring information can support collaboration across technical teams and agencies. Access arrangements and available capabilities depend on the adopted configuration and operating model." },
    { heading: "Implementation varies", body: "StackOps offers underlying observability technology options. Implementations and feature availability differ by option; the capabilities above describe the offering’s purpose, not an identical feature set for every deployment." },
    { heading: "Positioning reference", body: "Public coverage of StackOps and observability in government.", links: [{ label: "GovInsider — StackOps observability", href: sources.positioning }] },
  ] },
};
export const investigation = {
  eyebrow: "FROM VISIBILITY TO ACTION", scenario: "Understand Issues. Respond with Confidence.",
  beforeTag: "FRAGMENTED SIGNALS", beforeLabels: ["Slower fictional service", "Abnormal monitoring signals", "Request path needs investigation"],
  withTag: "CONNECTED INVESTIGATION", query: 'service.name:"catalog-svc" AND event.outcome:failure',
  steps: [{ k: "SIGNALS", v: "Review relevant logs and events" }, { k: "METRICS", v: "Compare performance signals" }, { k: "TRACE", v: "Follow application connections" }, { k: "CONTEXT", v: "Review database calls as a possible contributor" }],
  value: ["Follow the Connections.", "Narrow the Investigation."], valueSub: "Operational data helps engineers build a better understanding of where an issue may be occurring.",
  note: "Illustrative investigation · fictional systems and synthetic data · no guaranteed diagnosis",
};
export const investigationDetails: Detail = {
  id: "investigation", eyebrow: investigation.eyebrow,
  readMore: { title: "From monitoring signals to a clearer investigation", sections: [
    { heading: "The fictional scenario", body: "catalog-svc begins responding more slowly. An engineer reviews abnormal signals, compares related performance metrics and follows a request through connected application components." },
    { heading: "Narrowing the possibilities", body: "The illustrative trace shows slower calls to inventory-db. This is a lead for further investigation, not a confirmed root cause. Additional evidence and engineering review are needed before taking action." },
    { heading: "What the animation represents", body: "The infrastructure, query and trace are synthetic. Available tracing and monitoring workflows depend on the chosen technology and configuration. The demonstration does not show an actual agency incident or promise automated resolution." },
  ] },
};
export const modules = {
  sora: { enabled: true, id: "sora", name: "SORA", eyebrow: "STACKOPS-BUILT TOOL / SORA", headline: "Streamlining Observability Setup", summary: "Simplify observability setup and reduce manual configuration effort.", steps: ["Manual setup", "Clearer workflow", "Supported automation"], readMore: { title: "SORA — Streamlining Observability Setup", sections: [
    { heading: "Built by StackOps", body: "SORA is a StackOps-built supporting tool that helps simplify or automate observability setup. It is not a product developed by an underlying technology vendor." },
    { heading: "Scope awaiting confirmation", body: "Supported environments, available automation, eligibility and underlying technology compatibility need confirmation. This showcase does not assume support across all StackOps technology options." },
  ] } },
  soda: { enabled: true, id: "soda", name: "SODA", eyebrow: "STACKOPS-BUILT TOOL / SODA", headline: "Supporting Cost Visibility and Optimisation", summary: "Bring cost information into clearer view to support optimisation decisions.", steps: ["Fragmented costs", "Shared cost view", "Informed decisions"], readMore: { title: "SODA — Supporting Cost Visibility and Optimisation", sections: [
    { heading: "Built by StackOps", body: "SODA is a StackOps-built supporting tool that provides cost insights to support optimisation decisions. It is not a product developed by an underlying technology vendor." },
    { heading: "Insights, not guaranteed savings", body: "Cost information can inform a review of resource usage and configuration. The illustration makes no savings claim and uses no real agency cost data." },
    { heading: "Scope awaiting confirmation", body: "Availability, cost sources, supported underlying technologies and operating arrangements need confirmation. No separate charge or universal platform support is assumed." },
  ] } },
};
export const tools = { eyebrow: "STACKOPS-BUILT TOOLS", headline: ["Simplifying", "Observability Operations."], sub: "Supporting setup workflows and better-informed cost decisions." };
export type CustomerStory = Detail & { name: string; title: string; benefit: string; metric?: string; metricLabel?: string; evidence: { workflows?: number; improvementPercent?: number; logsPerMonth?: number; baselineHours?: number[]; afterMinutes?: number; underMinutes?: number; complianceStatus?: "planned"; quantitativeOutcome?: false } };
export const customerStories: CustomerStory[] = [
  { id: "cft", name: "CFT", eyebrow: "CLOUD FILE TRANSFER", title: "From Reactive to Proactive Operations", benefit: "Real-time monitoring and earlier issue identification support more efficient incident handling.", metric: "75%", metricLabel: "improvement in incident-handling efficiency", evidence: { workflows: 1500, improvementPercent: 75, baselineHours: [2, 3], afterMinutes: 30 }, readMore: { title: "CFT — From Reactive to Proactive Operations", sections: [
    { heading: "The challenge", body: "Fragmented monitoring and manual investigation limited operational visibility." },
    { heading: "StackOps’ contribution", body: "Real-time monitoring across more than 1,500 workflows enabled earlier identification of operational issues and supported a move towards proactive operations." },
    { heading: "Verified outcomes", body: "The official customer story reports a 75% improvement in incident-handling efficiency, with incident handling reduced from approximately 2–3 hours to 30 minutes. These are customer-specific reported results, not guaranteed outcomes for other deployments." },
  ] } },
  { id: "ship-hats", name: "SHIP-HATS", eyebrow: "SHIP-HATS", title: "Faster Detection. Faster Recovery.", benefit: "SLO monitoring and proactive alerts support faster incident detection and service recovery.", metric: "75%", metricLabel: "reduction in service recovery time", evidence: { improvementPercent: 75, baselineHours: [2], underMinutes: 30 }, readMore: { title: "SHIP-HATS — Faster Detection. Faster Recovery.", sections: [
    { heading: "The challenge", body: "The team sought to improve service monitoring and incident response." },
    { heading: "StackOps’ contribution", body: "Service Level Objective monitoring and proactive alerts supported earlier incident detection and a faster operational response." },
    { heading: "Verified outcomes", body: "The official customer story reports a 75% reduction in service recovery time, from approximately two hours to under 30 minutes. This is an attributed customer result, not a universal service commitment." },
  ] } },
  { id: "hdb", name: "HDB", eyebrow: "HOUSING & DEVELOPMENT BOARD", title: "Visibility Across Distributed Cloud Systems", benefit: "A clearer view of application health and performance across independently managed cloud workloads.", evidence: { complianceStatus: "planned", quantitativeOutcome: false }, readMore: { title: "HDB — Visibility Across Distributed Cloud Systems", sections: [
    { heading: "The challenge", body: "HDB’s distributed cloud architecture made organisation-wide visibility across independently managed workloads difficult." },
    { heading: "StackOps’ contribution", body: "StackOps improved visibility into application health and performance, supporting monitoring across distributed systems." },
    { heading: "Planned expansion", body: "HDB plans to expand StackOps capabilities for more centralised monitoring of standards and compliance. This is a planned expansion, not a completed result." },
  ] } },
  { id: "htx", name: "HTX", eyebrow: "HOME TEAM SCIENCE & TECHNOLOGY AGENCY", title: "Supporting Cloud-Native Transformation", benefit: "Unified observability and developer enablement support increasingly complex cloud-native systems.", evidence: { quantitativeOutcome: false }, readMore: { title: "HTX — Supporting Cloud-Native Transformation", sections: [
    { heading: "The challenge", body: "HTX’s evolving cloud-native environment required observability across increasingly complex systems." },
    { heading: "StackOps’ contribution", body: "StackOps supported unified observability across MHA systems hosted in Government Commercial Cloud, alongside developer enablement and operational visibility." },
    { heading: "Outcome context", body: "The story illustrates cloud-native enablement and shared operational visibility. No quantitative result is asserted here." },
  ] } },
  { id: "apex", name: "APEX", eyebrow: "API EXCHANGE", title: "Greater Visibility Across API Operations", benefit: "Self-service troubleshooting dashboards and operational insights support API platform teams.", metric: "90M+", metricLabel: "API transaction logs processed monthly", evidence: { logsPerMonth: 90000000 }, readMore: { title: "APEX — Greater Visibility Across API Operations", sections: [
    { heading: "The operational context", body: "APEX teams use operational data to understand API activity and support platform operations." },
    { heading: "Reported results", body: "The official customer story reports more than 90 million API transaction logs processed monthly, improved threat detection and prevention, self-service troubleshooting dashboards, and better platform adoption and usage insights." },
    { heading: "StackOps’ role", body: "StackOps supports visibility and analysis of operational data in this customer context. The figure refers to API transaction logs; it does not mean StackOps processes API transactions or replaces APEX’s core gateway or dedicated security capabilities." },
  ] } },
];
export const customers = { eyebrow: "STACKOPS CUSTOMER STORIES", headline: ["Real Systems.", "Measurable Impact."], sub: "Discover how government teams use StackOps to improve visibility, strengthen operations and support reliable digital services." };
export const options = { eyebrow: "PRICING / TECHNOLOGY OPTIONS", headline: ["Explore Your", "StackOps Options."], sub: "Underlying observability technologies within the complete StackOps offering.", platforms: [
  { id: "elastic", name: "Elastic", summary: "Search, analytics and observability for logs, metrics, traces and operational data." },
  { id: "dynatrace", name: "Dynatrace", summary: "Observability for application performance, service dependencies and AI-assisted analysis." },
], note: "Both technologies provide observability. Their implementations and supported features differ." };
export const closing = { headline: ["Build More Resilient", "Digital Services with StackOps."], sub: "Explore how StackOps can help your team gain greater operational visibility and support more reliable digital services.", href: sources.stories };
export const disclaimer = "Illustrative infrastructure and synthetic monitoring data. Customer outcomes are attributed to official StackOps stories and are not guaranteed for other deployments.";
export const siteMap = [
  { name: "Overview", label: "opening" }, { name: "The Challenge", label: "challenge" }, { name: "StackOps Capabilities", label: "capabilities" }, { name: "From Visibility to Action", label: "action" },
  { name: "StackOps Tools", label: "tools" }, { name: "Customer Stories", label: "customers" }, { name: "Pricing & Technology Options", label: "options" }, { name: "Get Started", label: "closing" },
];
export const elastic: TechnologyOption = {
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


export const dynatrace: TechnologyOption = {
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


export const details: Record<string, Detail> = Object.fromEntries([capabilities, investigationDetails, modules.sora, modules.soda, ...customerStories, elastic, dynatrace].map(d => [d.id, d]));
