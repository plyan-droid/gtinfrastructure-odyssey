// Visitor-facing story copy and attributed evidence. All network demonstrations are fictional.
export type DetailChart = {
  id: string;
  title: string;
  note?: string;
  kind?: "architecture" | "collection" | "tracing" | "lifecycle" | "hub" | "cards" | "pipeline" | "journey" | "stages" | "engine" | "beforeafter" | "quadrant" | "report" | "table";
  intro?: string;
  center?: { title: string; body: string };
  tone?: "problem";
  loop?: string;
  itemsHeading?: string;
  grades?: { grade: string; range: string; label: string }[];
  /** Illustrative sample only: never real tenant data. */
  report?: { synthetic: true; sampleLabel: string; grade: string; gradeLabel: string; metrics: { value: string; label: string }[]; barsTitle: string; bars: { label: string; value: number }[]; recsTitle: string; recs: string[] };
  groups?: { title: string; labels: string[] }[];
  footer?: { title: string; body: string }[];
  steps?: { title: string; body: string; requiresApproval?: boolean }[];
  columns?: string[];
  rows?: string[][];
  items?: { title: string; body: string }[];
  cyclic?: boolean;
};
export type Point = { n: string; title: string; body: string };
export type Section = { heading: string; body: string; links?: { label: string; href: string }[] };
export type Detail = {
  id: string;
  eyebrow: string;
  readMore: {
    title: string;
    sections: Section[];
    /** Scannable card layout: intro on top, sections as icon cards, closing + note below. */
    cards?: { variant?: "grid" | "timeline"; intro: string; closing: string; note: string };
    charts?: DetailChart[];
  };
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
export const chartCopy = {
  platforms: "GovTech Platforms", applications: "Applications", sgts: "Singapore Government Technology Stack", stackops: "StackOps", resiliency: "Observability and Operational Excellence", maturity: "Improve Maturity Across Organisations",
  request: "Request context · trace ID + baggage", central: "Central Observability", centralBody: "Connected telemetry from instrumented services", cycle: "Continuous improvement", concept: "Technology-specific capabilities",
};
export const popupCharts: Record<string, DetailChart[]> = {
  foundations: [
    { id: "sgts", title: "Where StackOps Fits in SGTS", kind: "architecture", groups: [
      { title: "Foundation", labels: ["Grants", "Info Services", "Professional Registration"] },
      { title: "Utility", labels: ["AI", "Data", "Identity", "Payments"] },
      { title: "Infrastructure", labels: ["Cloud", "Resiliency", "Developer Productivity", "Developer Services"] },
      { title: "Agency applications", labels: ["TradeNet", "WINS", "Parents Gateway"] },
      { title: "GovTech applications", labels: ["DIYGowhere", "AIBots"] },
    ] },
    { id: "onboarding", title: "Standards Out of the Box", kind: "pipeline", itemsHeading: "What gets applied automatically", steps: [
      { title: "Tenant onboards", body: "Console portal" },
      { title: "StackOps orchestrator", body: "Provisions the project" },
      { title: "Baseline pipeline", body: "Applies configurations as code" },
      { title: "Project ready", body: "Supported standards in place" },
    ], items: [
      { title: "Data & monitoring", body: "Data lifecycle policies, ingest pipelines, schemas, detection rules and monitoring connectivity." },
      { title: "Security & access", body: "Security roles, audit logging, network controls and supported TechPass / SEED access." },
    ] },
  ],
  capabilities: [
    { id: "collection-outcomes", title: "What Is Collected and What It Supports", kind: "collection", groups: [
      { title: "Collect", labels: ["Traces", "Metrics", "Logs", "Topology", "Behavior", "Code", "Metadata", "Network", "Problems", "Business Events", "Threats", "Vulnerabilities"] },
      { title: "Solve", labels: ["Observability", "Security", "Business", "Custom apps"] },
    ], footer: [
      { title: "Observability, security, and business data", body: "Collect deep, context-rich, and full stack data" },
      { title: "Unified observability and security", body: "Power automation, orchestration, prevention, and protection" },
    ] },
    { id: "apm-observability", title: "APM and Observability", kind: "table", columns: ["Focus", "Application performance monitoring", "Broader observability"], rows: [
      ["Questions", "How is the application performing?", "What explains this behaviour in context?"],
      ["Evidence", "Performance metrics, transactions and application traces", "Logs, metrics, traces and service relationships"],
      ["Investigation", "Track response time, errors and established thresholds", "Explore signals and dependencies across instrumented components"],
    ] },
  ],
  sora: [
    { id: "sora-workflow", title: "Discover, Review, Implement", kind: "pipeline", loop: "Re-run any time: safe and idempotent", steps: [
      { title: "Discover", body: "Scan supported resources and identify existing monitoring or gaps." },
      { title: "Review", body: "Inspect the generated configuration plan. Human approval is required.", requiresApproval: true },
      { title: "Implement", body: "Deploy approved configurations through supported infrastructure-as-code." },
      { title: "Monitor", body: "Check telemetry and review the resulting monitoring setup." },
    ] },
    { id: "sora-comparison", title: "Manual Setup vs SORA", kind: "table", columns: ["Activity", "Manual approach", "Supported SORA workflow"], rows: [
      ["Find gaps", "Audit each account by hand", "Discovery scan identifies potential gaps"],
      ["Set up ingestion", "Each team builds its own setup", "Reviewable, guided deployment"],
      ["Credentials", "Configure separately in applications", "Supported central handling"],
      ["Private networking", "Wire connections per account", "Reusable configuration where supported"],
      ["Multiple clouds", "Different tools and workflows", "Common workflow for supported environments"],
      ["Clean-up", "Find leftover resources manually", "Supported teardown workflow"],
      ["Logging baseline", "Review configurations manually", "Identify gaps and review proposed fixes"],
    ] },
  ],
  otel: [
    { id: "cross-cloud", title: "Cross-Cloud Tracing Architecture", kind: "tracing", groups: [
      { title: "AWS", labels: ["App1 services", "X-Ray"] },
      { title: "Azure", labels: ["App2 services", "Application Insights"] },
      { title: "Other cloud provider", labels: ["App3 services", "OpenTelemetry Collector"] },
    ], items: [
      { title: "Propagate context", body: "Instrumented services carry trace IDs and appropriate baggage along supported request paths." },
      { title: "Connect telemetry", body: "Provider-specific tooling or an OpenTelemetry collector can feed a supported common view." },
    ] },
  ],
  soda: [
    { id: "soda-impact", title: "Before and After SODA", kind: "beforeafter", columns: ["Review area", "Without structured analysis", "With supported SODA analysis"], rows: [
      ["Cost visibility", "One monthly billing total", "Review supported tier and index breakdowns"],
      ["Review effort", "Repeated manual checks", "Reports bring relevant findings together"],
      ["Recommendations", "Generic best practices", "Data-informed opportunities for review"],
      ["Governance", "React after usage has grown", "Identify potential waste earlier"],
    ] },
    { id: "soda-pipeline", title: "How SODA Collects Data", kind: "pipeline", itemsHeading: "What we collect", steps: [
      { title: "Supported deployments", body: "Hosted deployments and serverless projects within the supported scope" },
      { title: "Collection pipeline", body: "Scheduled collection of permitted deployment information" },
      { title: "StackOps central analysis", body: "Bring supported data together for review" },
    ], items: [
      { title: "Billing & cost data", body: "Tier costs and component charges" },
      { title: "Deployment configurations", body: "Node sizing and hardware profiles" },
      { title: "Index & storage data", body: "Lifecycle policies, document counts and storage" },
      { title: "Fleet & agent data", body: "Integrations and agent policies" },
      { title: "Synthetics & monitoring", body: "Monitor locations and frequency" },
      { title: "Alerting & security rules", body: "Supported rule configurations" },
    ] },
    { id: "soda-engine", title: "Cost Optimisation Engine", kind: "engine", items: [
      { title: "Node Sizing", body: "CPU and JVM utilisation vs capacity" },
      { title: "Storage Efficiency", body: "Idle data, empty indices" },
      { title: "Index Lifecycle", body: "Lifecycle gaps, tier migration" },
      { title: "Performance", body: "Alerting frequency, compression" },
      { title: "Synthetics", body: "Monitor type, location, frequency" },
    ], footer: [
      { title: "Optimisation Grade", body: "Score 0 to 100 across all dimensions" },
      { title: "Recommendations", body: "Actionable steps with indicative savings" },
      { title: "Cost Calculator", body: "Interactive what-if scenarios" },
    ], grades: [
      { grade: "S", range: "85+", label: "Optimised" },
      { grade: "A", range: "65 to 84", label: "Stable" },
      { grade: "B", range: "40 to 64", label: "Moderate" },
      { grade: "C", range: "0 to 39", label: "Wastage" },
    ], steps: [
      { title: "Analyse", body: "Assess supported configuration and utilisation data" },
      { title: "Recommend", body: "Surface opportunities and potential trade-offs" },
      { title: "Human decision", body: "Engineers review findings and decide whether to act", requiresApproval: true },
    ] },
  ],
  intelligence: [
    { id: "intelligence-flywheel", title: "Adopt, Analyse, Recommend, Improve", cyclic: true, steps: [
      { title: "Adopt", body: "Establish supported monitoring foundations" },
      { title: "Analyse", body: "Explore patterns and appropriate benchmarking" },
      { title: "Recommend", body: "Develop contextual guidance for review" },
      { title: "Improve", body: "Apply approved changes and share permitted learning" },
    ] },
  ],
  dynatrace: [
    { id: "platform-lifecycle", title: "Dynatrace Platform Components", kind: "lifecycle", note: "Dynatrace platform capabilities depend on the selected offering and configuration.", footer: [
      { title: "Observability, security, and business data", body: "Collect deep, context-rich, and full stack data" },
      { title: "Scalable data capture from any source", body: "Capture data in context automatically" },
      { title: "High-performance data ingest and enrichment", body: "Protect data, reduce cost, and gain context at any scale" },
      { title: "Graph-powered data lakehouse", body: "Store data in context and query with massive parallel processing technology" },
      { title: "Hypermodal artificial intelligence", body: "Analyze with causal, predictive, and generative AI for answers and automation" },
      { title: "Answer-driven automation", body: "Leverage data for post-processing automation" },
      { title: "Unified observability and security", body: "Power automation, orchestration, prevention, and protection" },
    ] },
    { id: "operating-models", title: "Dynatrace Operating Models", kind: "table", columns: ["Responsibility", "StackOps centrally managed", "Agency self-managed"], rows: [
      ["Primary value", "Built and operated centrally by StackOps", "Agency retains autonomy"],
      ["Operating model", "Controlled and operated by StackOps", "Operated by the individual agency"],
      ["ActiveGate & connectivity", "Provided and maintained by StackOps", "Agency builds and maintains"],
      ["Admin rights", "Vested with StackOps", "Agency owns feature controls"],
      ["Environment", "Shared multi-tenant environment, segregated by tagging", "Dedicated agency environment / tenant"],
      ["Alerting", "Pre-configured anomaly detection", "Agency can customise thresholds"],
      ["Agent patching", "StackOps regulates releases; agencies own deployment timelines", "Agency owns patch compliance"],
    ] },
  ],
};

type ChartPlacement = { before?: DetailChart[]; after?: DetailChart[] };
const slideCharts: Record<string, ChartPlacement> = {
  foundations: {
    before: [
      { id: "stackops-hub", title: "StackOps: SGTS Observability Solution", kind: "hub", groups: [
        { title: "Sources", labels: ["Applications", "Cloud infrastructure"] },
        { title: "Signals", labels: ["Logs", "Metrics", "Traces"] },
      ], center: { title: "StackOps", body: "Generally available since August 2025" }, items: [
        { title: "Goal", body: "Help agencies improve system and site resiliency and quality through IM-compliant monitoring." },
        { title: "Purpose", body: "A common monitoring platform for collaboration on monitoring data and shared knowledge." },
      ], footer: [
        { title: "Security", body: "Authentication through TechPass, secure device access through SEED, encryption at rest and in transit, and role-based access down to field level." },
        { title: "Observability and collaboration", body: "Shared data schemas and common logging practices and standards across agencies." },
        { title: "Ease of use", body: "Visualisation and dashboard templates, SORA, engineering enablement and Whole-of-Government integration." },
        { title: "Alerts to resolution", body: "Alerts flow into Jira Service Management, paging the right team and tracking every step to recovery." },
      ] },
      { id: "more-than-monitoring", title: "What StackOps Provides Beyond Tooling", kind: "cards", items: [
        { title: "Standards built in", body: "Whole-of-Government compliance, security and best practices ship with the platform, supported by a shared knowledge base." },
        { title: "Tooling to support users", body: "Automation such as SORA streamlines onboarding, and data insights feed improvements back to every team." },
        { title: "Intelligence layered on", body: "AI-assisted analysis and consultancy recommendations lift maturity continuously." },
      ] },
    ],
  },
  capabilities: {
    after: [
      { id: "why-apm", title: "Why APM Matters for Agencies", kind: "cards", items: [
        { title: "Protects the service", body: "A slowdown of a single second can lose a transaction or a citizen's trust." },
        { title: "Faster resolution", body: "Teams move from digging through logs to proactive, automated alerts." },
        { title: "Bridges the gap", body: "Developers, operations and business teams share the same real-time data." },
        { title: "Fewer noisy alerts", body: "Anomaly detection adapts to each baseline, so only urgent issues page on-call." },
      ] },
      { id: "golden-signals", title: "The 4 Golden Signals", kind: "cards", items: [
        { title: "Latency", body: "How long requests take to respond." },
        { title: "Traffic", body: "How much demand is on the system, such as requests per second." },
        { title: "Errors", body: "Rate of failed requests, such as 500-level errors." },
        { title: "Saturation", body: "How full the infrastructure is, such as CPU and memory usage." },
      ] },
    ],
  },
  investigation: {
    before: [
      { id: "cross-agency-journey", title: "Tracing a Transaction Across Agencies", intro: "A single transaction, such as a housing benefit application, can pass through several agencies. Unified tracing treats it as one journey, not three tickets.", kind: "journey", steps: [
        { title: "Agency A", body: "Application on AWS" },
        { title: "Agency B", body: "Database on Azure" },
        { title: "Agency C", body: "Identity gateway" },
      ], center: { title: "Single trace view", body: "Each agency hop appears in the same trace" } },
    ],
  },
  sora: {
    before: [
      { id: "sora-problem", title: "The Problem: Each Team Sets Up Monitoring Separately", kind: "cards", tone: "problem", items: [
        { title: "Repeated work", body: "The same setup is rebuilt across every team and account." },
        { title: "Credentials everywhere", body: "Secrets copied into every app create security risk." },
        { title: "Unnoticed gaps", body: "Unmonitored resources and no shared standard." },
        { title: "Hard to audit", body: "Hard to review, and hard to undo." },
      ] },
      { id: "sora-how", title: "How SORA Works", intro: "From scan to live monitoring in four steps.", kind: "pipeline", loop: "Done with it? One command removes everything SORA created.", steps: [
        { title: "Discover", body: "Scans your cloud and finds what is not being monitored." },
        { title: "Review", body: "You review the generated config. Nothing changes yet.", requiresApproval: true },
        { title: "Deploy", body: "Preview, then spin up agents and connections." },
        { title: "Monitor", body: "Logs and metrics flow into your dashboard." },
      ] },
    ],
    after: [
      { id: "sora-get", title: "What You Will Get", kind: "cards", items: [
        { title: "Gap discovery", body: "Scans AWS and Azure and flags what is missing." },
        { title: "Pre-flight checks", body: "Validates credentials and connectivity before anything deploys." },
        { title: "Private networking", body: "Keeps data off the public internet, set up with one command." },
        { title: "Secure gateway", body: "One credential per account, not one per app." },
        { title: "Logging baseline", body: "Monitoring status report with ready-made fix configs." },
        { title: "Synthetic monitoring", body: "Checks your sites and APIs like a real user." },
      ] },
      { id: "sora-code", title: "Do Developers Need to Change Code?", kind: "cards", items: [
        { title: "Infrastructure", body: "No. SORA collects cloud logs and metrics at the cloud level." },
        { title: "Application tracing", body: "Add an OpenTelemetry SDK, or use an auto-instrumentation agent that often needs no code change." },
        { title: "AWS and Azure together", body: "Both clouds feed the same deployment for one unified view." },
      ] },
    ],
  },
  otel: {
    before: [
      { id: "otel-problem", title: "Why It Is Needed", kind: "cards", tone: "problem", items: [
        { title: "Siloed visibility", body: "Native cloud tools only see their own environment, creating blind spots." },
        { title: "Broken traces", body: "A transaction crossing clouds loses its trail mid-flight." },
        { title: "High recovery time", body: "Engineers switch between consoles to troubleshoot a single issue." },
      ] },
    ],
    after: [
      { id: "otel-how", title: "How It Is Achieved", kind: "pipeline", steps: [
        { title: "Standardise on OpenTelemetry", body: "One open-source, cloud-agnostic framework to collect logs, metrics and traces." },
        { title: "Deploy an observability platform", body: "Route telemetry from each cloud to a single source of truth." },
        { title: "Map correlated dependencies", body: "Bind multi-cloud data to see the full application map." },
      ], items: [
        { title: "No data loss on short outages", body: "Agents and collectors buffer locally, so delivery is delayed rather than lost." },
      ] },
    ],
  },
  soda: {
    after: [
      { id: "soda-report", title: "What a SODA Report Looks Like", kind: "report", report: {
        synthetic: true, sampleLabel: "Illustrative sample data, not a real tenant", grade: "B", gradeLabel: "Moderate",
        metrics: [{ value: "58", label: "Optimisation score" }, { value: "1.4 TB", label: "Storage reviewed" }, { value: "12", label: "Findings" }],
        barsTitle: "Deployment sizing and utilisation", bars: [{ label: "Hot tier CPU", value: 22 }, { label: "Hot tier memory", value: 81 }, { label: "Warm tier storage", value: 46 }, { label: "Frozen tier storage", value: 12 }],
        recsTitle: "Recommendations", recs: ["Right-size hot tier nodes to match observed CPU", "Move indices older than 30 days to a cooler tier", "Remove empty indices and idle data streams", "Reduce synthetic monitor frequency where not needed"],
      } },
      { id: "soda-tiers", title: "Elastic Data Tiers", kind: "pipeline", steps: [
        { title: "Hot", body: "Recent and frequently queried. Fastest, highest cost." },
        { title: "Warm", body: "Less frequent queries at lower cost." },
        { title: "Cold", body: "Longer retention, cheaper storage." },
        { title: "Frozen", body: "Cheapest, slower to query, still accessible." },
      ] },
    ],
  },
  intelligence: {
    after: [
      { id: "fragmented-connected", title: "Connecting Data From Separate Tools", kind: "cards", items: [
        { title: "Integrated platform", body: "One place for observability, security and business data." },
        { title: "Unified data", body: "Signals stored together, in context." },
        { title: "Real-time context", body: "Dependencies and topology updated as systems change." },
        { title: "Answers, not guesses", body: "Root cause based on evidence rather than intuition." },
      ] },
      { id: "answers-flow", title: "From Dependency Data to Action", kind: "journey", steps: [
        { title: "Unified AI lakehouse", body: "All telemetry stored in context" },
        { title: "Real-time dependency graph", body: "How every component connects" },
        { title: "Agentic operations", body: "Intelligence that acts on answers" },
      ] },
    ],
  },
  dynatrace: {
    before: [
      { id: "differentiator", title: "How Dynatrace Differs", kind: "journey", steps: [
        { title: "Understand", body: "Your data in context" },
        { title: "Leverage", body: "The power of AI" },
        { title: "Empower", body: "Teams to automate" },
        { title: "Drive", body: "Your outcomes forward" },
      ] },
      { id: "dt-benefits", title: "What Teams Get", kind: "cards", items: [
        { title: "Unified visibility across cloud and AI workloads", body: "Distributed tracing exposes latency and failing hops across services, with auto-discovery of containers and serverless workloads." },
        { title: "Automatic root cause, not just alerts", body: "Fault-tree analysis pinpoints the true root cause and correlates metrics, logs and traces with shared context." },
        { title: "Faster remediation with cloud context", body: "Surfaces upstream cloud failures such as DNS and storage in the tools teams already use." },
      ] },
      { id: "dt-stages", title: "From Collection to Solution", kind: "stages", groups: [
        { title: "Collect", labels: ["Traces", "Metrics", "Logs", "Topology"] },
        { title: "Capture", labels: ["OneAgent", "OpenTelemetry"] },
        { title: "Contextualise", labels: ["Semantic dictionary"] },
        { title: "Process", labels: ["Graph-powered lakehouse"] },
        { title: "Analyse", labels: ["Causal, predictive, generative AI"] },
        { title: "Automate", labels: ["Workflows", "AppEngine"] },
        { title: "Solve", labels: ["Observability", "Security", "Business"] },
      ] },
      { id: "visibility-action", title: "Root Cause, Validation and Prioritisation", kind: "cards", items: [
        { title: "Determine root cause", body: "Instantly, with logs, traces, metrics and events in context." },
        { title: "Validate behaviour", body: "Across services and dependencies, continuously." },
        { title: "Prioritise by impact", body: "Resolve issues based on real business impact." },
        { title: "Prevent", body: "Enable proactive and preventive operations with AI." },
      ] },
    ],
  },
  elastic: {
    before: [
      { id: "elastic-basics", title: "Elastic in One Line", kind: "cards", items: [
        { title: "Elastic is the engine", body: "Stores, indexes and searches logs, metrics and traces in real time." },
        { title: "Kibana is the cockpit", body: "The dashboards, alerts and visualisations you work in." },
        { title: "Serverless option", body: "No cluster sizing. Capacity scales with usage across Search, Observability and Security projects. Any savings are indicative and depend on usage." },
      ] },
    ],
  },
};
for (const [id, place] of Object.entries(slideCharts)) {
  popupCharts[id] = [...(place.before ?? []), ...(popupCharts[id] ?? []), ...(place.after ?? [])];
}
export const subscriptionDraft = {
  title: "StackOps Subscription Model Offerings",
  columns: ["", "StackOps Dynatrace Central Managed", "Agency Dynatrace Self-Managed", "StackOps Elastic"],
  /** Elastic column is a draft pending StackOps team review. */
  elastic: [
    "Managed Elastic Cloud (hosted or serverless) provided through StackOps",
    "StackOps provisions; agency uses its own deployment",
    "Not applicable; SORA sets up private networking and a secure gateway",
    "Agency manages its own spaces, with role-based access",
    "Agency deployment or serverless project",
    "Kibana alerting with optional anomaly detection",
    "Elastic Agent and OpenTelemetry collectors, kept current with SORA baselines",
  ],
};
{
  const dt = popupCharts["dynatrace"] ?? [];
  const models = dt.find(c => c.id === "operating-models");
  if (models?.rows) {
    popupCharts["dynatrace"] = dt.filter(c => c !== models);
    popupCharts["subscriptions"] = [{ id: "subscription-models", title: subscriptionDraft.title, kind: "table", columns: subscriptionDraft.columns, rows: models.rows.map((r, i) => [...r, subscriptionDraft.elastic[i] ?? ""]) }, 
      { id: "central-managed", title: "Central Managed: Key Characteristics", kind: "cards", items: [
        { title: "Centralised maintenance", body: "The central team owns the ActiveGate and manages all underlying resource maintenance and stability." },
        { title: "Standardised thresholds", body: "Alerts and thresholds are pre-configured with Dynatrace Intelligence anomaly detection for consistent, high-quality monitoring." },
        { title: "Agent distribution", body: "OneAgent binaries are provisioned from a central S3 repository, aligned to GovTech-validated versions." },
      ] },
      { id: "self-managed", title: "Agency Self-Managed: Full Autonomy and Ownership", kind: "cards", items: [
        { title: "Dedicated tenant", body: "A new environment is created for the agency." },
        { title: "Agency-owned infrastructure", body: "The agency builds and maintains the ActiveGate and supporting infrastructure." },
        { title: "Full admin rights", body: "The agency has full configuration flexibility." },
      ] },
    ];
  }
}
popupCharts["gcc"] = [
  { id: "gcc-challenges", title: "Cloud Success Depends on What Happens Before and After Deployment", kind: "cards", tone: "problem", items: [
    { title: "Late discovery", body: "Security, compliance and integration issues can surface late, when development happens far from the GCC operating environment." },
    { title: "Fragmented visibility", body: "Cloud spend data is spread across providers, accounts and manual workflows." },
    { title: "Unrealised value", body: "Cost drivers and savings opportunities are harder to act on without a common view." },
  ] },
  { id: "gcc-journey", title: "One Journey: Build, Operate and Optimise", kind: "journey", steps: [
    { title: "Build", body: "Build closer to GCC" },
    { title: "Deploy", body: "Move with confidence" },
    { title: "Operate", body: "Run workloads" },
    { title: "Understand", body: "See consumption" },
    { title: "Optimise", body: "Take action" },
  ], center: { title: "GCC: Government on Commercial Cloud", body: "Build with confidence, operate with visibility, optimise with insight" } },
  { id: "gccaas-onboarding", title: "GCCaaS Onboarding Journey, Starting Q3 2026", kind: "pipeline", steps: [
    { title: "Development environment", body: "You need a GCC development environment." },
    { title: "Express interest", body: "Indicate your interest today." },
    { title: "Review and approval", body: "Onboarding request review and approval." },
    { title: "Service agreement", body: "Sign the customer service agreement." },
    { title: "Cloud configuration", body: "Configure cloud settings once onboarding is complete." },
  ] },
  { id: "gcc-pulse", title: "GCC PULSE: View, Understand, Optimise", kind: "pipeline", steps: [
    { title: "Monitor", body: "Unified view of cloud spend" },
    { title: "Diagnose", body: "Identify cost drivers" },
    { title: "Optimise", body: "Take action" },
    { title: "Track", body: "Realised savings" },
  ] },
  { id: "gcc-story", title: "Not Separate Products: One GCC Platform Story", kind: "cards", items: [
    { title: "GCCaaS: build with confidence", body: "Start aligned with GCC and reduce late-stage delivery friction for agency partners." },
    { title: "GCC Platform Journey", body: "Build, deploy, operate, understand and optimise as one integrated experience." },
    { title: "GCC PULSE: optimise with insight", body: "Turn cloud consumption into measurable action and savings." },
  ] },
];
const popupContent: Detail[] = [
  {
    id: "foundations",
    eyebrow: "WHY STACKOPS",
    readMore: {
      title: "Why Agencies Use StackOps",
      sections: [
        {
          heading: "Why Agencies Use StackOps",
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
      title: "What Logs, Metrics and Traces Tell You",
      cards: {
        intro: "Logs, metrics and traces help teams investigate different parts of a system. Here's what each one tells you.",
        closing: "Together, these signals help teams build a clearer picture of what's happening across their applications and infrastructure.",
        note: "Available capabilities depend on the selected observability technology, instrumentation and configuration.",
      },
      sections: [
        {
          heading: "LOGS: What happened?",
          body: "Event records help engineers examine system activity, errors and what happened around the time of an issue.",
        },
        {
          heading: "METRICS: How is it performing?",
          body: "Measurements such as response time, error rate and resource usage help teams track system performance.",
        },
        {
          heading: "TRACES: Where did the request go?",
          body: "Distributed traces help engineers follow requests across instrumented services and identify where delays may occur.",
        },
        {
          heading: "SERVICE CONTEXT: How are the systems connected?",
          body: "Service relationships help engineers understand dependencies and investigate how an issue in one component may affect others.",
        },
      ],
    },
  },
  {
    id: "investigation",
    eyebrow: "INVESTIGATION",
    readMore: {
      title: "How Engineers Investigate an Incident",
      cards: {
        variant: "timeline",
        intro: "An alert tells you something needs attention, but not always where the problem started. Here's how engineers might investigate a slow response in a digital service.",
        closing: "With the available monitoring data and service context, engineers can work through the issue step by step.",
        note: "Illustrative scenario using synthetic data. Actual capabilities depend on the configured monitoring tools. Diagnosis and resolution are not guaranteed.",
      },
      sections: [
        { heading: "01: Detect", body: "A response-time metric shows higher-than-usual latency." },
        { heading: "02: Examine", body: "Check logs, metrics and events for clues." },
        { heading: "03: Trace", body: "Follow the request across services where tracing is available." },
        { heading: "04: Investigate", body: "Use service dependencies and monitoring evidence to narrow down possible causes." },
        { heading: "05: Respond", body: "Review the evidence and decide what action to take." },
      ],
    },
  },
  {
    id: "sora",
    eyebrow: "SORA",
    readMore: {
      title: "SORA: Automated Monitoring Setup for AWS and Azure",
      sections: [
        {
          heading: "SORA: Automated Monitoring Setup for AWS and Azure",
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
      title: "Cross-Cloud Tracing with OpenTelemetry",
      sections: [
        {
          heading: "Cross-Cloud Tracing with OpenTelemetry",
          body: "A digital service may rely on applications and infrastructure spread across different environments.\n\nWithout connected operational context, engineers may need to investigate each component separately.\n\nOpenTelemetry provides open standards and tools for generating, collecting and exporting telemetry such as logs, metrics and traces.\n\nWith appropriate instrumentation and supported integrations, teams can:\n\n- Follow requests across instrumented services.\n\n- Understand relationships between components.\n\n- Investigate delays and errors.\n\n- Examine relevant operational signals together.\n\n- Support cross-team troubleshooting.",
        },
        {
          heading: "For leaders: tracing across agencies",
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
      title: "SODA: Cost and Health Analysis for Elastic",
      sections: [
        {
          heading: "SODA: Cost and Health Analysis for Elastic",
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
      title: "How Recommendations Improve Over Time",
      sections: [
        {
          heading: "How Recommendations Improve Over Time",
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
      title: "Cloud File Transfer: Earlier Issue Detection",
      sections: [
        {
          heading: "Cloud File Transfer: Earlier Issue Detection",
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
  {
    id: "subscriptions",
    eyebrow: "STACKOPS SUBSCRIPTIONS",
    readMore: { title: "Subscription Models Compared", sections: [{ heading: "Choosing a model", body: "Confirm technical requirements and subscription terms with the StackOps team." }] },
  },
  {
    id: "gcc",
    eyebrow: "PART OF THE GCC JOURNEY",
    readMore: { title: "From Build to Better Cloud Outcomes", sections: [{ heading: "One government cloud journey", body: "Government on Commercial Cloud (GCC) gives agencies and partners a common foundation with the guardrails and capabilities needed to build, deploy, operate and optimise securely. StackOps helps teams operate with visibility along that journey." }] },
  },
];
for (const detail of popupContent) {
  const charts = popupCharts[detail.id];
  if (charts) detail.readMore.charts = charts;
}
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
  expandChart: "Enlarge chart",
  collapseChart: "Fit chart",
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
  headline: ["FULL-STACK OBSERVABILITY", "FOR GOVERNMENT DIGITAL SERVICES."],
  sub: "Gain operational visibility, simplify monitoring setup and support more reliable digital services with StackOps.",
  secondary: "Streamline telemetry onboarding, correlate operational data across clouds and reduce incident resolution time.",
};
export const topology = {
  eyebrow: "ILLUSTRATIVE SERVICE MAP",
  headline: "END-TO-END REQUEST FLOWS",
  sub: "A request can pass through several applications and cloud components. Here's a simplified look at how they connect.",
  tiers: ["01 / Access", "02 / Services", "03 / Data & Cloud"],
};
export const challenge = {
  eyebrow: "THE CHALLENGE",
  headline: ["WHEN INCIDENTS SPAN", "MULTIPLE CLOUD ENVIRONMENTS."],
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
  headline: ["COMPLETE TELEMETRY IN", "ONE UNIFIED CONTEXT."],
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
  scenario: "FASTER INCIDENT DIAGNOSIS AND RESOLUTION.",
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
      title: "CFT: Earlier Issue Detection",
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
      title: "SHIP-HATS: Faster Detection and Recovery",
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
  headline: ["RESULTS FROM", "AGENCY DEPLOYMENTS."],
  sub: "Discover how government teams have used StackOps to improve visibility, strengthen operations and support digital-service reliability.",
};
export const options = {
  eyebrow: "STACKOPS TECHNOLOGY OPTIONS",
  headline: ["CHOOSE THE RIGHT", "OBSERVABILITY PLATFORM."],
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
  modelsMore: "Compare subscription models",
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
  headline: ["ACCELERATE OBSERVABILITY", "FOR YOUR AGENCY."],
  sub: "Explore a government-focused approach to observability, monitoring automation and operational insight.",
  href: "https://www.developer.tech.gov.sg/products/categories/devops/stackops/customer-stories",
  gccMore: "Part of the GCC journey",
};
export const disclaimer =
  "Illustrative infrastructure and synthetic monitoring data. Customer outcomes are attributed to official StackOps stories and are not guaranteed for other deployments.";
export const contextSections = {
  foundations: {
    eyebrow: "THE STACKOPS ADVANTAGE",
    headline: ["ENGINEERED FOR THE", "SINGAPORE GOVERNMENT TECH STACK."],
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
    headline: ["AUTOMATED ONBOARDING", "WITH SORA."],
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
    headline: ["TRACING REQUESTS", "ACROSS CLOUD PROVIDERS."],
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
    headline: ["COST AND HEALTH", "OPTIMISATION WITH SODA."],
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
    headline: ["RECOMMENDATIONS THAT IMPROVE", "WITH EVERY TENANT."],
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
  { name: "How Recommendations Improve Over Time", label: "intelligence" },
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
