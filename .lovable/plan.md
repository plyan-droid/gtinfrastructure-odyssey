# Director's feedback: copy and chart updates

Copy and popup changes only. The background map stays as it is.

## 1. StackOps at a glance popup
- **ONBOARDING:** "Automated provisioning with built-in best practices". Body: "Monitoring for AWS and Azure accounts is set up automatically using StackOps standards, and you review it before anything is applied." (SORA is no longer named here.)
- **TRACING:** "Follow requests across cloud solutions". Same body text.
- **COST** becomes **RECOMMENDATIONS:** "Data-driven recommendations for your configuration". Body: "Regular reports use your platform data to suggest improvements to configuration, health and cost."

## 2. SORA popup
- Combine the two repeated four-step diagrams ("Discover, Review, Implement" and "How SORA Works") into one: **Discover, Review, Deploy, Monitor**. The Review step still needs human approval, and both notes stay ("Re-run any time: safe and idempotent", "One command removes everything SORA created").
- The "hours instead of weeks" line and its caveat are already there and stay.
- Add a new point: **"Automation pipeline enables continuous coverage improvement."** Plain explanation: "Run SORA as a scheduled job, for example daily, and it spots new cloud resources and highlights where monitoring can be added."

## 3. Cross-Cloud Tracing popup
- Change "For leaders: tracing across agencies" to "For leaders: tracing across agencies and organisations".

## 4. SODA popup (make it broader)
- Label: "COST AND HEALTH OPTIMISATION (SODA)" becomes "RECOMMENDATIONS FROM DATA INSIGHTS (SODA)". The Site Map and story wording change to match.
- Intro wording: cost and health become examples of what SODA finds, not the only things it covers.

## 5. How Recommendations Improve Over Time
- "Unified AI lakehouse" becomes **"AI Context"** ("All telemetry kept in shared context"). The Dynatrace popup's own lakehouse terms stay, because they are Dynatrace's names for its product.

## 6. Elastic popup
- Remove the third card, "Serverless option". In its place add **"Workflows and AI Agents"**: "Automate response steps and use AI assistants to help investigate and act, supporting AI-assisted operations." Exact capability depends on the subscription and configuration.
- Add one short Elastic popup line about workflows and AI agents in the same plain language.

## 7. Subscription Models Compared
- Assume everything is serverless and remove the "hosted or serverless" choice:
  - Primary value: "Managed Elastic Cloud provided through StackOps"
  - Environment setup: "Agency serverless project"
- In the SODA data-collection chart, "Hosted deployments and serverless projects" becomes "Supported Elastic projects".

## Technical details
- All edits are in `src/content/showcase.ts`. Remove the duplicated `sora-how` chart and keep `sora-workflow` (renamed, with merged steps and both loop notes), then update the chart test that expects `sora-how`.
- Add tests: the SORA popup has one four-step workflow, no Elastic or subscription copy mentions "serverless option" or "hosted or", and the glance cards no longer name SORA.
- Run the tests, then check the Glance, SORA, SODA and Elastic popups in the preview.
