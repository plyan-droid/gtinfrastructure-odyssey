// Visitor-facing story copy and attributed evidence. All network demonstrations are fictional.
export type Point = { n: string; title: string; body: string };
export type Section = { heading: string; body: string; links?: { label: string; href: string }[] };
export type Detail = {
  id: string;
  eyebrow: string;
  readMore: { title: string; sections: Section[] };
};
export type Product = Detail & {
  problem: string;
  problemSub: string;
  headline: string[];
  description: string;
  points: Point[];
};
export type TechnologyOption = Product;
export const sources = {
  stories: "https://www.developer.tech.gov.sg/products/categories/devops/stackops/customer-stories",
  positioning:
    "https://govinsider.asia/intl-en/article/how-govtech-singapores-stackops-enhances-observability-in-public-sector-it",
};
const popupContent: Detail[] = [
  {
    id: "foundations",
    eyebrow: "WHY STACKOPS",
    readMore: {
      title: "More Than Monitoring. Built for Government.",
      sections: [
        {
          heading: "More Than Monitoring. Built for Government.",
          body: "Observability technology is one part of maintaining dependable digital services.\n\nStackOps brings together monitoring capabilities, shared standards, reusable configurations and supporting tools designed for government operational environments.",
        },
        {
          heading: "Government-Ready Foundations",
          body: "Common logging practices, configuration baselines and relevant security controls help teams establish more consistent monitoring.",
        },
        {
          heading: "Less Repetitive Engineering Work",
          body: "Structured deployment workflows and reusable automation help simplify supported monitoring-setup activities.",
        },
        {
          heading: "Shared Operational Knowledge",
          body: "Common practices, reusable rules and engineering knowledge support collaboration and continuous improvement.",
        },
        {
          heading: "Actionable Insights",
          body: "Operational data and analytical capabilities help teams identify issues and improvement opportunities.\n\nWhy it matters: Agencies can explore observability through a government-focused offering rather than having to establish every supporting practice independently.",
        },
        {
          heading: "For leaders",
          body: "Standards ship with the platform instead of living in documents: data lifecycle policies, detection rules, audit logging and security roles are applied from day one, which supports more consistent governance across teams.",
        },
        {
          heading: "For engineering teams",
          body: "Baseline configurations are delivered as deployable configuration-as-code through a pipeline when a project is onboarded, including ingest pipelines, data schemas, agent configuration and monitoring connectivity. Access uses TechPass, with SEED for secure device access.",
        },
      ],
    },
  },
  {
    id: "capabilities",
    eyebrow: "CAPABILITIES",
    readMore: {
      title: "Understand Your Systems Beyond Individual Dashboards.",
      sections: [
        {
          heading: "Understand Your Systems Beyond Individual Dashboards.",
          body: "Modern digital services generate different types of operational information.",
        },
        {
          heading: "Logs: What happened?",
          body: "Event records help engineers examine system activities and errors.",
        },
        {
          heading: "Metrics: How is it performing?",
          body: "Measurements such as response time, error rate and resource utilisation help teams assess system health.",
        },
        {
          heading: "Traces: Where did the request go?",
          body: "Distributed traces help engineers follow requests across appropriately instrumented services.",
        },
        {
          heading: "Connected Context: How are systems related?",
          body: "Relevant dependency information helps teams understand how different components interact.\n\nTogether, these signals can provide a more complete view of complex digital services and support incident investigation.\n\nThe available features depend on the observability technology and configuration.",
        },
      ],
    },
  },
  {
    id: "investigation",
    eyebrow: "INVESTIGATION",
    readMore: {
      title: "Follow the Evidence, Not Just the Alert.",
      sections: [
        {
          heading: "Follow the Evidence, Not Just the Alert.",
          body: "An alert may indicate that an application is experiencing unusual behaviour. Understanding the cause requires investigating the available operational evidence.\n\nConsider a fictional digital service experiencing slower response times.\n\nDetect: Performance metrics indicate unusual latency.\n\nExamine: Engineers review relevant logs, metrics and events.\n\nTrace: Available request traces help reveal the services involved.\n\nInvestigate: Service relationships and monitoring evidence help narrow down possible contributing components.\n\nRespond: Engineers determine the appropriate course of action.\n\nStackOps provides observability capabilities that support investigation and troubleshooting.\n\nThis is an illustrative scenario using synthetic data, not a guarantee of automatic diagnosis or resolution.",
        },
      ],
    },
  },
  {
    id: "sora",
    eyebrow: "SORA",
    readMore: {
      title: "SORA: From Guidance to Running Configuration.",
      sections: [
        {
          heading: "SORA: From Guidance to Running Configuration.",
          body: "StackOps Resiliency Accelerator helps streamline monitoring setup through structured, reusable workflows.",
        },
        {
          heading: "Discover",
          body: "Scan supported cloud resources, identify existing monitoring arrangements and highlight potential gaps.",
        },
        {
          heading: "Review",
          body: "Generate and inspect proposed monitoring configurations before making changes.",
        },
        {
          heading: "Deploy",
          body: "Use supported infrastructure-as-code automation to implement approved configurations.",
        },
        {
          heading: "Monitor",
          body: "Collect relevant telemetry and review the resulting monitoring information.",
        },
        {
          heading: "For leaders",
          body: "Today, every team often builds monitoring from scratch, the same work repeated across teams and accounts, with gaps that go unnoticed and setups that are hard to audit or undo. SORA turns that into one repeatable, reviewable workflow.",
        },
        {
          heading: "For engineering teams: manual vs with SORA",
          body: "- Find gaps: audit each account by hand → automated discovery scan.\n\n- Ingestion: built separately by every team → one guided deploy.\n\n- Credentials: copied into every app → held in one place.\n\n- Private networking: wired per account → set up for you.\n\n- Clean-up: leftover resources → one-command teardown.\n\nRe-runs are designed to be safe and repeatable. Supported cloud environments to be confirmed with the StackOps team.",
          links: [
            {
              label: "Explore SORA on GitLab (InnerSource)",
              href: "https://sgts.gitlab-dedicated.com/innersource/sgts/stackops/automations/stackops-resiliency-accelerator",
            },
          ],
        },
        {
          heading: "Why it matters",
          body: "- Less repetitive manual setup.\n\n- More consistent monitoring configurations.\n\n- Improved awareness of monitoring gaps.\n\n- Reusable deployment practices.\n\n- Clearer configuration review and control.\n\nSpecific environments, integrations and deployment capabilities depend on the supported solution.",
        },
      ],
    },
  },
  {
    id: "otel",
    eyebrow: "OTEL",
    readMore: {
      title: "One Service Journey. Multiple Connected Systems.",
      sections: [
        {
          heading: "One Service Journey. Multiple Connected Systems.",
          body: "A digital service may rely on applications and infrastructure spread across different environments.\n\nWithout connected operational context, engineers may need to investigate each component separately.\n\nOpenTelemetry provides open standards and tools for generating, collecting and exporting telemetry such as logs, metrics and traces.\n\nWith appropriate instrumentation and supported integrations, teams can:\n\n- Follow requests across instrumented services.\n\n- Understand relationships between components.\n\n- Investigate delays and errors.\n\n- Examine relevant operational signals together.\n\n- Support cross-team troubleshooting.",
        },
        {
          heading: "For leaders: one citizen journey, not three tickets",
          body: "A single citizen transaction may touch an application in one cloud, a data service in another and a shared identity gateway. Connected tracing helps teams treat it as one journey, so issues are not passed between separate teams before anyone sees the full picture.\n\nThis is an illustrative example, not a description of any specific agency's architecture.",
        },
        {
          heading: "For engineering teams: how it is achieved",
          body: "- Standardise on OpenTelemetry to collect logs, metrics and traces in a cloud-agnostic way.\n\n- Route telemetry into a supported observability platform as a common view.\n\n- Correlate dependencies so the request path can be followed across environments.\n\nCross-system visibility depends on instrumentation, system configuration and access permissions. It is not automatically available across all agencies or environments.",
        },
      ],
    },
  },
  {
    id: "soda",
    eyebrow: "SODA",
    readMore: {
      title: "SODA: Turn Data Into Optimisation Insights.",
      sections: [
        {
          heading: "SODA: Turn Data Into Optimisation Insights.",
          body: "StackOps Data Analysis helps teams examine supported deployment, utilisation and cost-related information.",
        },
        {
          heading: "Deployment Sizing",
          body: "Review resource sizing and utilisation to identify areas worth investigating.",
        },
        {
          heading: "Storage Efficiency",
          body: "Examine storage usage and relevant configuration patterns.",
        },
        {
          heading: "Index Lifecycle",
          body: "Review supported retention and index-management practices.",
        },
        {
          heading: "Operational Recommendations",
          body: "Surface findings that may help teams prioritise improvement activities.",
        },
        {
          heading: "For leaders",
          body: "A clearer view of where observability capacity and storage are going, so improvement effort can be prioritised with evidence rather than guesswork.",
        },
        {
          heading: "For engineering teams",
          body: "Review how data is collected and stored, compare deployment sizing against actual utilisation, and work through recommendations one at a time.",
        },
        {
          heading: "Why it matters",
          body: "SODA helps turn complex operational information into more actionable analysis and recommendations.\n\nRecommendations support human decision-making and do not guarantee financial savings.",
        },
      ],
    },
  },
  {
    id: "intelligence",
    eyebrow: "INTELLIGENCE",
    readMore: {
      title: "Intelligence That Compounds",
      sections: [
        {
          heading: "Intelligence That Compounds",
          body: "StackOps' broader intelligence proposition explores how shared operational knowledge, AI-assisted analysis and appropriate benchmarking can support continuous improvement.",
        },
        {
          heading: "Cross-Organisation Benchmarking",
          body: "Shared benchmarks could help organisations better understand monitoring maturity and identify improvement opportunities.",
        },
        {
          heading: "AI-Assisted Analysis",
          body: "Analysis of operational telemetry can potentially reveal patterns, gaps and areas requiring attention.",
        },
        {
          heading: "Organisation-Specific Recommendations",
          body: "Contextual guidance can support more informed monitoring and operational improvement decisions.",
        },
        {
          heading: "Growing Knowledge Base",
          body: "Accumulated knowledge and shared practices can contribute to more consistent standards over time.\n\nThe longer-term direction: Moving beyond individual monitoring views towards more informed, repeatable operational improvement.\n\nContent validation required: The availability and scope of these capabilities must be confirmed with the StackOps product team. Until then, this copy describes a direction, not a generally available feature guarantee.",
        },
      ],
    },
  },
  {
    id: "cft",
    eyebrow: "CFT",
    readMore: {
      title: "Cloud File Transfer: From Reactive to Proactive Operations",
      sections: [
        {
          heading: "Cloud File Transfer: From Reactive to Proactive Operations",
          body: "Cloud File Transfer supports secure file exchanges between government agencies.\n\nPreviously, fragmented monitoring tools and manual investigation limited visibility across workflows.\n\nStackOps helped the CFT team establish more comprehensive monitoring.",
        },
        {
          heading: "Reported outcomes",
          body: "- Real-time monitoring across more than 1,500 workflows.\n\n- Earlier identification of potential issues.\n\n- Improved operational visibility.\n\n- Incident handling time reduced from approximately 2–3 hours to 30 minutes.\n\nThe official customer story reports a 75% improvement in incident-handling efficiency.\n\nSource: GovTech StackOps Customer Stories.",
        },
      ],
    },
  },
  {
    id: "ship-hats",
    eyebrow: "SHIP-HATS",
    readMore: {
      title: "SHIP-HATS: Faster Detection and Recovery",
      sections: [
        {
          heading: "SHIP-HATS: Faster Detection and Recovery",
          body: "SHIP-HATS implemented Service Level Objective monitoring with StackOps to strengthen incident detection and response.\n\nProactive alerts helped the team recognise disruptions earlier.",
        },
        {
          heading: "Reported outcomes",
          body: "- 75% reduction in service recovery time.\n\n- Recovery improved from approximately two hours to under 30 minutes.\n\n- Faster detection of service disruptions.\n\n- More streamlined operational processes.\n\nThese are documented results from this implementation, not guaranteed outcomes for other agencies.\n\nSource: GovTech StackOps Customer Stories.",
        },
      ],
    },
  },
  {
    id: "hdb",
    eyebrow: "HDB",
    readMore: {
      title: "HDB: Visibility Across Distributed Cloud Systems",
      sections: [
        {
          heading: "HDB: Visibility Across Distributed Cloud Systems",
          body: "HDB uses distributed cloud architecture to support flexibility, risk isolation and digital-service development.\n\nIndependently managed workloads can make organisation-wide monitoring more complex.\n\nStackOps helps HDB gain visibility into application health and performance across distributed workloads.\n\nThe implementation supports greater operational understanding and more consistent monitoring.\n\nHDB also plans to extend StackOps' capabilities for centralised monitoring of compliance with organisational standards and security requirements.\n\nThis is a planned expansion, not a completed outcome.\n\nSource: GovTech StackOps Customer Stories.",
        },
      ],
    },
  },
  {
    id: "htx",
    eyebrow: "HTX",
    readMore: {
      title: "HTX: Supporting Cloud-Native Transformation",
      sections: [
        {
          heading: "HTX: Supporting Cloud-Native Transformation",
          body: "HTX has been progressing from infrastructure migration towards broader cloud-native adoption.\n\nThis evolution creates growing requirements for operational visibility and developer enablement.\n\nStackOps has worked with HTX to support unified observability across MHA systems hosted in the Government Commercial Cloud.\n\nThe collaboration supports efforts to improve operational visibility and strengthen cloud operations.\n\nSource: GovTech StackOps Customer Stories.",
        },
      ],
    },
  },
  {
    id: "apex",
    eyebrow: "APEX",
    readMore: {
      title: "APEX: Greater Visibility Across API Operations",
      sections: [
        {
          heading: "APEX: Greater Visibility Across API Operations",
          body: "APEX supports API-based connectivity across Singapore's digital government ecosystem.\n\nStackOps supports operational analysis and troubleshooting through monitoring information, dashboards and insights into platform activity.",
        },
        {
          heading: "Reported capabilities and results",
          body: "- More than 90 million API transaction logs processed monthly.\n\n- Enhanced threat detection and prevention.\n\n- Self-service troubleshooting dashboards.\n\n- Greater visibility into platform adoption and usage.\n\nThese capabilities support platform teams in understanding system behaviour and investigating operational issues.\n\nSource: GovTech StackOps Customer Stories.",
        },
      ],
    },
  },
  {
    id: "elastic",
    eyebrow: "ELASTIC",
    readMore: {
      title: "Elastic: Operational Data Analysis and Observability",
      sections: [
        {
          heading: "Elastic: Operational Data Analysis and Observability",
          body: "Elastic is an underlying observability technology option available through StackOps.\n\nRelevant capabilities include:\n\n- Log collection and analytics.\n\n- Search and investigation.\n\n- Metrics monitoring.\n\n- Distributed tracing.\n\n- Dashboards and visualisations.\n\n- Alerting and monitoring workflows.\n\nStackOps provides relevant supporting standards, configurations and tools around the available observability offering.\n\nSpecific capabilities and deployment arrangements depend on the selected implementation.",
        },
      ],
    },
  },
  {
    id: "dynatrace",
    eyebrow: "DYNATRACE",
    readMore: {
      title: "Dynatrace: Application and Infrastructure Observability",
      sections: [
        {
          heading: "Dynatrace: Application and Infrastructure Observability",
          body: "Dynatrace is an underlying observability technology option available through StackOps.\n\nRelevant capabilities include:\n\n- Application performance monitoring.\n\n- Infrastructure and cloud-native observability.\n\n- Service-dependency visibility.\n\n- Distributed tracing.\n\n- AI-assisted problem analysis.\n\n- Monitoring dashboards and operational insights.",
        },
        {
          heading: "For leaders: choosing an operating model",
          body: "StackOps Centrally Managed: built and operated centrally by StackOps, so agencies carry less operational overhead.\n\nAgency Self-Managed: the agency retains full autonomy over its dedicated environment and its operational responsibilities.",
        },
        {
          heading: "For engineering teams: what differs",
          body: "- Connectivity (ActiveGate): provided and maintained by StackOps, or built and maintained by the agency.\n\n- Admin rights: vested with StackOps, or owned by the agency.\n\n- Environment: shared multi-tenant environment segregated by tagging, or a dedicated agency tenant.\n\n- Alerting: pre-configured anomaly detection, or agency-customised thresholds.\n\n- Agent patching: StackOps regulates releases while agencies own deployment timelines, or the agency owns full patch compliance.\n\nConfirm technical requirements and subscription terms with the StackOps team.",
        },
      ],
    },
  },
];
function requiredDetail(id: string): Detail {
  const detail = popupContent.find((d) => d.id === id);
  if (!detail) throw new Error(`Missing detail: ${id}`);
  return detail;
}
export const details: Record<string, Detail> = Object.fromEntries(
  popupContent.map((d) => [d.id, d]),
);
export const intelligenceApproval = {
  availability: "pending-product-owner-validation",
  publicPresentationApproved: false,
} as const;
export const ui = {
  readMore: "Read More",
  siteMap: "Site Map",
  start: "Scroll to begin",
  close: "Close",
  brand: "StackOps",
  pricing: "Pricing information pending confirmation",
  optionScope:
    "Capabilities, connectivity, administration, tenant arrangements, alerting and patching depend on the selected offering. Confirm technical requirements and subscription terms with the StackOps team.",
  source: "Official customer story",
  attributed: "Reported in the official StackOps customer story",
  storySection: "Customer stories",
  storyNumber: "Story",
  previous: "Previous customer story",
  next: "Next customer story",
  technologyMore: "Technical Details",
  toolsNote: "Scope, availability and supported technology options to be confirmed.",
  toolsBuilt: "Built by StackOps",
  explore: "Explore StackOps",
  discover: "Scroll to explore",
  present: "Presentation Mode",
  exitPresentation: "Exit Presentation Mode",
  pause: "Pause presentation",
  resume: "Resume presentation",
  discussion: "Arrange a Discussion",
  discussionPending: "Discussion booking link pending approval",
  websiteQr: "Website QR · approved URL pending",
  discussionQr: "Discussion QR · approved URL pending",
  vision: "DIRECTION · PENDING VALIDATION",
};
export const diagram = {
  environmentA: "Fictional environment A",
  environmentB: "Fictional environment B",
  analytics: "MONITORING INSIGHTS",
  telemetry: "logs · metrics · traces",
  latency: "latency ↑",
  response: "response time ↑",
  spans: "slow spans · synthetic trace",
  query: "query latency ↑",
  paths: ["VISIBILITY", "RELIABILITY"],
  fragmented: ["logs-view", "metrics-view", "trace-view"],
  synthetic: "FICTIONAL RESOURCES · SYNTHETIC SIGNALS",
  event: "Application API · request delayed",
  baseline: "Reusable baseline",
  access: "Scoped access · configuration review",
  approval: "Human approval required",
  approved: "Illustrative approved plan",
  gap: "Potential monitoring gap",
  utilisation: "Resource utilisation",
  storage: "Storage / index review",
  recommendation: "Recommendation for review",
  decision: "Engineer decides · no automatic changes",
  instrumented: "Instrumented components only",
  workflowCount: "1,500+ monitored workflows",
  potential: "Possible contributor · review required",
};
export const mapCopy = {
  tiers: ["ACCESS", "APPLICATION & SERVICES", "DATA & CLOUD"],
  layer: "STACKOPS OBSERVABILITY LAYER",
  support: "Supporting resources",
};
export const serviceLabels = {
  web: "Citizen Portal",
  mobile: "Mobile Client",
  gateway: "API Gateway",
  checkout: "Identity Service",
  catalog: "Application API",
  payments: "Background Worker",
  orders: "Message Queue",
  inventory: "Data Service",
  cloudA: "Cloud Environment A",
  cloudB: "Cloud Environment B",
};
export const opening = {
  eyebrow: "STACKOPS / WHOLE-OF-GOVERNMENT OBSERVABILITY",
  headline: ["MORE THAN MONITORING.", "BUILT FOR GOVERNMENT."],
  sub: "Gain operational visibility, simplify monitoring setup and support more reliable digital services with StackOps.",
  secondary: "Observability. Reimagined.",
};
export const topology = {
  eyebrow: "ILLUSTRATIVE SERVICE MAP",
  headline: "BEHIND EVERY DIGITAL SERVICE.",
  sub: "A request can pass through several applications and cloud components. Here's a simplified look at how they connect.",
  tiers: ["01 / Access", "02 / Services", "03 / Data & Cloud"],
};
export const challenge = {
  eyebrow: "THE CHALLENGE",
  headline: ["ONE DIGITAL SERVICE.", "MANY MOVING PARTS."],
  sub: "One request may pass through several applications, APIs and cloud environments. When something slows down, figuring out where to look isn't always easy.",
  items: [
    {
      n: "01",
      title: "Fragmented Monitoring",
      body: "Logs, metrics and other monitoring data may sit in different tools, making it harder to see the whole picture.",
    },
    {
      n: "02",
      title: "Complex Dependencies",
      body: "A single request can involve multiple applications and environments.",
    },
    {
      n: "03",
      title: "Difficult Investigation",
      body: "When something goes wrong, engineers need to piece together the evidence from different systems.",
    },
    {
      n: "04",
      title: "Repeated Setup",
      body: "Teams may spend time configuring and maintaining similar monitoring workflows.",
    },
  ],
};
export const capabilities: Product = {
  ...requiredDetail("capabilities"),
  id: "capabilities",
  eyebrow: "STACKOPS CAPABILITIES",
  problem: "",
  problemSub: "",
  headline: ["SEE THE", "BIGGER PICTURE."],
  description:
    "Different signals tell different parts of the story. Together with service context, they help teams understand how applications and infrastructure behave.",
  points: [
    { n: "01", title: "LOGS", body: "What happened?" },
    { n: "02", title: "METRICS", body: "How is it performing?" },
    { n: "03", title: "TRACES", body: "Where did the request go?" },
    { n: "04", title: "CONTEXT", body: "How are the services connected?" },
  ],
  readMore: requiredDetail("capabilities").readMore,
};
export const investigation = {
  eyebrow: "FROM VISIBILITY TO ACTION",
  scenario: "FOLLOW THE EVIDENCE. UNDERSTAND THE ISSUE.",
  sub: "Relevant monitoring signals and service context help engineers investigate operational issues more effectively.",
  steps: [
    { k: "01", v: "Detect unusual behaviour" },
    { k: "02", v: "Examine operational signals" },
    { k: "03", v: "Follow service dependencies" },
    { k: "04", v: "Investigate possible causes" },
  ],
  value: ["Follow the evidence.", "Understand the issue."],
  valueSub:
    "Relevant monitoring signals and service context help engineers investigate operational issues more effectively.",
  note: "Illustrative investigation · synthetic data · no guaranteed diagnosis",
};
export const investigationDetails = details["investigation"];
export const modules = {
  sora: {
    ...details["sora"],
    enabled: true,
    name: "SORA",
    steps: ["DISCOVER", "REVIEW", "DEPLOY", "MONITOR"],
  },
  soda: {
    ...details["soda"],
    enabled: true,
    name: "SODA",
    steps: ["UTILISATION", "STORAGE", "RECOMMENDATIONS", "DECISIONS"],
  },
};
export type CustomerStory = Detail & {
  name: string;
  title: string;
  benefit: string;
  metric?: string;
  metricLabel?: string;
  evidence: {
    workflows?: number;
    improvementPercent?: number;
    logsPerMonth?: number;
    baselineHours?: number[];
    afterMinutes?: number;
    underMinutes?: number;
    complianceStatus?: "planned";
    quantitativeOutcome?: false;
  };
};
export const customerStories: CustomerStory[] = [
  {
    id: "cft",
    name: "CFT",
    eyebrow: "CLOUD FILE TRANSFER",
    title: "From Reactive to Proactive Operations",
    benefit:
      "Real-time monitoring and earlier issue identification support more efficient incident handling.",
    metric: "75%",
    metricLabel: "improvement in incident-handling efficiency",
    evidence: { workflows: 1500, improvementPercent: 75, baselineHours: [2, 3], afterMinutes: 30 },
    readMore: {
      title: "CFT: From Reactive to Proactive Operations",
      sections: [
        {
          heading: "The challenge",
          body: "Fragmented monitoring and manual investigation limited operational visibility.",
        },
        {
          heading: "StackOps’ contribution",
          body: "Real-time monitoring across more than 1,500 workflows enabled earlier identification of operational issues and supported a move towards proactive operations.",
        },
        {
          heading: "Verified outcomes",
          body: "The official customer story reports a 75% improvement in incident-handling efficiency, with incident handling reduced from approximately 2–3 hours to 30 minutes. These are customer-specific reported results, not guaranteed outcomes for other deployments.",
        },
      ],
    },
  },
  {
    id: "ship-hats",
    name: "SHIP-HATS",
    eyebrow: "SHIP-HATS",
    title: "Faster Detection. Faster Recovery.",
    benefit:
      "SLO monitoring and proactive alerts support faster incident detection and service recovery.",
    metric: "75%",
    metricLabel: "reduction in service recovery time",
    evidence: { improvementPercent: 75, baselineHours: [2], underMinutes: 30 },
    readMore: {
      title: "SHIP-HATS: Faster Detection. Faster Recovery.",
      sections: [
        {
          heading: "The challenge",
          body: "The team sought to improve service monitoring and incident response.",
        },
        {
          heading: "StackOps’ contribution",
          body: "Service Level Objective monitoring and proactive alerts supported earlier incident detection and a faster operational response.",
        },
        {
          heading: "Verified outcomes",
          body: "The official customer story reports a 75% reduction in service recovery time, from approximately two hours to under 30 minutes. This is an attributed customer result, not a universal service commitment.",
        },
      ],
    },
  },
  {
    id: "hdb",
    name: "HDB",
    eyebrow: "HOUSING & DEVELOPMENT BOARD",
    title: "Visibility Across Distributed Cloud Systems",
    benefit:
      "A clearer view of application health and performance across independently managed cloud workloads.",
    evidence: { complianceStatus: "planned", quantitativeOutcome: false },
    readMore: {
      title: "HDB: Visibility Across Distributed Cloud Systems",
      sections: [
        {
          heading: "The challenge",
          body: "HDB’s distributed cloud architecture made organisation-wide visibility across independently managed workloads difficult.",
        },
        {
          heading: "StackOps’ contribution",
          body: "StackOps improved visibility into application health and performance, supporting monitoring across distributed systems.",
        },
        {
          heading: "Planned expansion",
          body: "HDB plans to expand StackOps capabilities for more centralised monitoring of standards and compliance. This is a planned expansion, not a completed result.",
        },
      ],
    },
  },
  {
    id: "htx",
    name: "HTX",
    eyebrow: "HOME TEAM SCIENCE & TECHNOLOGY AGENCY",
    title: "Supporting Cloud-Native Transformation",
    benefit:
      "Unified observability and developer enablement support increasingly complex cloud-native systems.",
    evidence: { quantitativeOutcome: false },
    readMore: {
      title: "HTX: Supporting Cloud-Native Transformation",
      sections: [
        {
          heading: "The challenge",
          body: "HTX’s evolving cloud-native environment required observability across increasingly complex systems.",
        },
        {
          heading: "StackOps’ contribution",
          body: "StackOps supported unified observability across MHA systems hosted in Government Commercial Cloud, alongside developer enablement and operational visibility.",
        },
        {
          heading: "Outcome context",
          body: "The story illustrates cloud-native enablement and shared operational visibility. No quantitative result is asserted here.",
        },
      ],
    },
  },
  {
    id: "apex",
    name: "APEX",
    eyebrow: "API EXCHANGE",
    title: "Greater Visibility Across API Operations",
    benefit:
      "Self-service troubleshooting dashboards and operational insights support API platform teams.",
    metric: "90M+",
    metricLabel: "API transaction logs processed monthly",
    evidence: { logsPerMonth: 90000000 },
    readMore: {
      title: "APEX: Greater Visibility Across API Operations",
      sections: [
        {
          heading: "The operational context",
          body: "APEX teams use operational data to understand API activity and support platform operations.",
        },
        {
          heading: "Reported results",
          body: "The official customer story reports more than 90 million API transaction logs processed monthly, improved threat detection and prevention, self-service troubleshooting dashboards, and better platform adoption and usage insights.",
        },
        {
          heading: "StackOps’ role",
          body: "StackOps supports visibility and analysis of operational data in this customer context. The figure refers to API transaction logs; it does not mean StackOps processes API transactions or replaces APEX’s core gateway or dedicated security capabilities.",
        },
      ],
    },
  },
];

customerStories.forEach((story) => {
  const complete = details[story.id];
  if (complete) story.readMore = complete.readMore;
});
export const customers = {
  eyebrow: "PROVEN GOVERNMENT USE CASES",
  headline: ["REAL SYSTEMS.", "MEASURABLE IMPACT."],
  sub: "Discover how government teams have used StackOps to improve visibility, strengthen operations and support digital-service reliability.",
};
export const options = {
  eyebrow: "STACKOPS TECHNOLOGY OPTIONS",
  headline: ["EXPLORE YOUR", "STACKOPS OPTIONS."],
  sub: "Explore the underlying observability technologies and operating approaches available through StackOps.",
  platforms: [
    {
      id: "elastic",
      name: "Elastic",
      summary:
        "Search, analytics and observability capabilities for logs, metrics, traces and operational data.",
    },
    {
      id: "dynatrace",
      name: "Dynatrace",
      summary:
        "Application and infrastructure observability, dependency visibility and AI-assisted problem analysis.",
    },
  ],
  note: "Both provide observability capabilities. They are not mutually exclusive and are not necessarily deployed together.",
  modelsHeading: "Dynatrace operating models",
  models: [
    {
      title: "StackOps Centrally Managed",
      body: "A centrally operated environment with relevant configuration and platform responsibilities managed by StackOps.",
    },
    {
      title: "Agency Self-Managed",
      body: "An agency-managed approach providing greater control over the dedicated environment and related operational responsibilities.",
    },
  ],
};
export const closing = {
  eyebrow: "GET STARTED WITH STACKOPS",
  headline: ["SEE WHAT STACKOPS CAN DO", "FOR YOUR AGENCY."],
  sub: "Explore a government-focused approach to observability, monitoring automation and operational insight.",
  href: "https://www.developer.tech.gov.sg/products/categories/devops/stackops/customer-stories",
};
export const disclaimer =
  "Illustrative infrastructure and synthetic monitoring data. Customer outcomes are attributed to official StackOps stories and are not guaranteed for other deployments.";
export const contextSections = {
  foundations: {
    eyebrow: "THE STACKOPS ADVANTAGE",
    headline: ["MORE THAN A", "MONITORING TOOL."],
    sub: "StackOps combines observability capabilities with shared standards, automation and engineering practices designed for government operations.",
    detail: "foundations",
    points: [
      {
        n: "01",
        title: "GOVERNMENT-READY FOUNDATIONS",
        body: "Start with shared monitoring standards and reusable configurations instead of building everything from scratch.",
      },
      {
        n: "02",
        title: "LESS REPEATED SETUP",
        body: "Use supported automation to reduce the time spent on routine monitoring configuration.",
      },
      {
        n: "03",
        title: "BETTER OPERATIONAL CONTEXT",
        body: "Bring relevant monitoring signals and service relationships together when investigating issues.",
      },
      {
        n: "04",
        title: "BUILD ON SHARED KNOWLEDGE",
        body: "Use common practices and lessons learned to improve monitoring over time.",
      },
    ],
  },
  tools: {
    eyebrow: "STACKOPS-BUILT AUTOMATION",
    headline: ["LESS MANUAL SETUP.", "MORE REPEATABLE MONITORING."],
    sub: "SORA (StackOps Resiliency Accelerator) helps streamline monitoring setup through resource discovery, configuration review and supported automation.",
    detail: "sora",
    note: "Specific environments, integrations and deployment capabilities depend on the supported solution.",
    points: [
      {
        n: "01",
        title: "DISCOVER",
        body: "Scan supported fictional resources for possible monitoring gaps.",
      },
      {
        n: "02",
        title: "REVIEW",
        body: "Inspect a proposed configuration plan at a human approval checkpoint.",
      },
      {
        n: "03",
        title: "DEPLOY",
        body: "Implement approved monitoring configurations with supported automation.",
      },
      {
        n: "04",
        title: "MONITOR",
        body: "Collect relevant telemetry from newly configured resources.",
      },
    ],
  },
  otel: {
    eyebrow: "CONNECTED SERVICE VISIBILITY",
    headline: ["ONE JOURNEY.", "MULTIPLE SYSTEMS."],
    sub: "Standardised telemetry helps teams investigate how appropriately instrumented services behave across connected environments.",
    detail: "otel",
    note: "Visibility depends on instrumentation, configuration, supported integrations and access permissions.",
    points: [
      { n: "01", title: "INSTRUMENT", body: "Generate telemetry from supported services." },
      { n: "02", title: "CONNECT", body: "Collect and route relevant telemetry." },
      {
        n: "03",
        title: "INVESTIGATE",
        body: "Follow requests and examine available service context.",
      },
    ],
  },
  soda: {
    eyebrow: "STACKOPS-BUILT ANALYSIS",
    headline: ["FROM DATA TO", "ACTIONABLE INSIGHTS."],
    sub: "SODA (StackOps Data Analysis) helps teams examine deployment, utilisation and cost-related information to identify optimisation opportunities.",
    detail: "soda",
    note: "Synthetic data only. Recommendations support human decisions, not guaranteed savings.",
    points: [
      {
        n: "01",
        title: "UNDERSTAND UTILISATION",
        body: "Review deployment sizing and resource-usage information.",
      },
      {
        n: "02",
        title: "EXAMINE STORAGE EFFICIENCY",
        body: "Understand relevant storage and index-lifecycle patterns.",
      },
      {
        n: "03",
        title: "IDENTIFY OPPORTUNITIES",
        body: "Surface configurations and operational patterns worth investigating.",
      },
      {
        n: "04",
        title: "MAKE INFORMED DECISIONS",
        body: "Use recommendations to prioritise appropriate improvements.",
      },
    ],
  },
  intelligence: {
    eyebrow: "THE EVOLUTION OF STACKOPS",
    headline: ["INTELLIGENCE", "THAT COMPOUNDS."],
    sub: "Explore how AI-assisted analysis, shared benchmarks and operational knowledge can inform continuous improvement across government organisations.",
    detail: "intelligence",
    note: "Future direction · availability, scope and data governance pending product-owner validation.",
    points: [
      {
        n: "01",
        title: "ANALYSE",
        body: "Identify patterns, gaps and improvement opportunities in operational information.",
      },
      {
        n: "02",
        title: "BENCHMARK",
        body: "Use appropriate shared benchmarks to understand organisational maturity.",
      },
      {
        n: "03",
        title: "RECOMMEND",
        body: "Inform improvement planning through organisation-specific guidance.",
      },
      {
        n: "04",
        title: "IMPROVE",
        body: "Refine practices and standards through shared learning.",
      },
    ],
  },
};
export const siteMap = [
  { name: "Overview", label: "opening" },
  { name: "The Challenge", label: "challenge" },
  { name: "Why StackOps", label: "foundations" },
  { name: "Observability", label: "capabilities" },
  { name: "Incident Investigation", label: "action" },
  { name: "SORA", label: "tools" },
  { name: "Cross-System Observability", label: "otel" },
  { name: "SODA", label: "soda" },
  { name: "Intelligence That Compounds", label: "intelligence" },
  { name: "Customer Stories", label: "customers" },
  { name: "Technology & Operating Options", label: "options" },
  { name: "Get Started", label: "closing" },
];
export const visualCopy: Record<string, { title: string; rows: string[] }> = {
  reveal: {
    title: "A connected fictional service",
    rows: ["Citizen Portal → API Gateway → Application API"],
  },
  fragmented: {
    title: "Separate monitoring views",
    rows: ["Logs · metrics · traces in separate views"],
  },
  dependencies: {
    title: "Service dependencies",
    rows: ["Citizen Portal → API Gateway → Application API → Data Service"],
  },
  context: {
    title: "Relevant service context",
    rows: ["Available signals · configured relationships"],
  },
  repeated: {
    title: "Repeated setup",
    rows: ["Similar configuration activities across fictional resources"],
  },
  baseline: {
    title: "Reusable monitoring baselines",
    rows: ["Supported resources · reviewed configurations"],
  },
  automation: {
    title: "A repeatable workflow",
    rows: ["Discover → review → approved deployment → monitor"],
  },
  learning: {
    title: "Shared operational knowledge",
    rows: ["Adopt → review → improve · conceptual feedback"],
  },
  logs: {
    title: "LOGS",
    rows: [
      "14:02:01 · request received",
      "14:02:02 · data call delayed",
      "Application API · synthetic events",
    ],
  },
  metrics: { title: "METRICS", rows: ["Response time over time · illustrative latency trend"] },
  signals: { title: "EXAMINE", rows: ["Synthetic event records and performance trend"] },
  trace: {
    title: "TRACES",
    rows: ["Citizen Portal → API Gateway → Application API → Data Service"],
  },
  slowdown: { title: "DETECT", rows: ["Application API · response time ↑ · investigation needed"] },
  cause: { title: "INVESTIGATE", rows: ["Data Service · possible contributor · not confirmed"] },
  discover: { title: "DISCOVER", rows: ["Scan supported resources · potential monitoring gaps"] },
  approval: { title: "REVIEW", rows: ["Proposed monitoring plan", "Human approval required"] },
  deploy: { title: "DEPLOY", rows: ["Illustrative approved plan · supported configurations"] },
  telemetry: { title: "MONITOR", rows: ["Configured resources → relevant signals"] },
  instrument: { title: "INSTRUMENT", rows: ["Telemetry enabled on supported services only"] },
  utilisation: { title: "UTILISATION", rows: ["Synthetic resource usage · deployment sizing"] },
  storage: { title: "STORAGE", rows: ["Data Service · storage and index-lifecycle review"] },
  recommendation: {
    title: "OPPORTUNITIES",
    rows: ["Review retention and resource usage · illustrative report"],
  },
  decision: { title: "DECISIONS", rows: ["Awaiting human evaluation · no automatic changes"] },
  analyse: {
    title: "CONCEPTUAL ANALYSIS",
    rows: ["Synthetic patterns and coverage gaps", "Future direction · pending validation"],
  },
  benchmark: {
    title: "CONCEPTUAL BENCHMARKS",
    rows: [
      "Fictional anonymised environments",
      "No actual agency rankings or shared raw telemetry",
    ],
  },
  guidance: {
    title: "CONCEPTUAL GUIDANCE",
    rows: [
      "Review monitoring coverage",
      "Examine configuration consistency",
      "Consider operational-practice improvements",
    ],
  },
  improve: {
    title: "CONTINUOUS IMPROVEMENT",
    rows: [
      "ADOPT → ANALYSE → RECOMMEND → IMPROVE",
      "Conceptual direction · not autonomous learning",
    ],
  },
  search: { title: "Operational data analysis", rows: ["Related events · metrics · traces"] },
  closing: { title: "StackOps", rows: ["A government-focused approach to observability"] },
};
