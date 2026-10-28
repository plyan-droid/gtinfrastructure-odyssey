import { ArrowDown, ArrowRight, CornerDownLeft } from "lucide-react";
import { chartCopy, type DetailChart } from "@/content/showcase";

function Architecture({ chart }: { chart: DetailChart }) {
  return <div className="architecture-diagram">
    <p className="chart-kicker">{chartCopy.sgts}</p>
    <div className="architecture-columns">
      <div><h4 className="chart-column-title">{chartCopy.platforms}</h4>
        {chart.groups?.slice(0, 3).map(group => <div className="architecture-tier" key={group.title}>
          <h5>{group.title}</h5><div className="architecture-labels">{group.labels.map(label => <span className={label === "Resiliency" ? "resiliency-label" : ""} key={label}>{label}</span>)}</div>
          {group.title === "Infrastructure" && <div className="stackops-anchor"><span className="stackops-connector" aria-hidden /><strong>{chartCopy.stackops}</strong><p>{chartCopy.resiliency}</p><p>{chartCopy.maturity}</p></div>}
        </div>)}
      </div>
      <div><h4 className="chart-column-title">{chartCopy.applications}</h4>{chart.groups?.slice(3).map(group => <div className="architecture-tier application-tier" key={group.title}><h5>{group.title}</h5><ul>{group.labels.map(label => <li key={label}>{label}</li>)}</ul></div>)}</div>
    </div>
  </div>;
}
function Collection({ chart }: { chart: DetailChart }) {
  return <div className="collection-flow">
    {chart.groups?.map((group, i) => <div className={`collection-column collection-${i}`} key={group.title}>
      <h4 className="chart-column-title"><span className="chart-number">{String(i + 1).padStart(2, "0")}</span>{group.title}</h4>
      <ul className="collection-labels">{group.labels.map(label => <li key={label}>{label}</li>)}</ul>
      {chart.footer?.[i] && <div className="collection-footer"><h5>{chart.footer[i]?.title}</h5><p>{chart.footer[i]?.body}</p></div>}
    </div>)}
    <div className="collection-arrow" aria-hidden><ArrowRight /><ArrowDown /></div>
  </div>;
}
function Tracing({ chart }: { chart: DetailChart }) {
  return <div className="tracing-diagram"><p className="trace-context">{chartCopy.request}</p><div className="tracing-providers">{chart.groups?.map(group => <div className="tracing-provider" key={group.title}><h4>{group.title}</h4><p className="trace-app">{group.labels[0]}</p><ArrowDown aria-hidden /><p className="trace-tool">{group.labels[1]}</p></div>)}</div><div className="trace-bus" aria-hidden /><div className="trace-destination"><p className="chart-kicker">{chartCopy.stackops}</p><h4>{chartCopy.central}</h4><p>{chartCopy.centralBody}</p></div></div>;
}
function Steps({ chart }: { chart: DetailChart }) {
  return <div className={chart.cyclic ? "chart-cycle" : "chart-flow"}>
    <ol>{chart.steps?.map((step, i) => <li key={step.title} className={step.requiresApproval ? "approval-step" : ""}><span className="chart-number">{String(i + 1).padStart(2, "0")}</span><div><h4>{step.title}</h4><p>{step.body}</p></div>{!chart.cyclic && i < (chart.steps?.length ?? 0) - 1 && <ArrowDown aria-hidden className="step-arrow" />}</li>)}</ol>
    {chart.cyclic && <div className="cycle-center"><CornerDownLeft aria-hidden /><span>{chartCopy.cycle}</span></div>}
  </div>;
}
function Chart({ chart }: { chart: DetailChart }) {
  return <figure className={`detail-chart chart-${chart.id}`} aria-labelledby={`chart-${chart.id}`}>
    <h3 id={`chart-${chart.id}`} className="chart-title">{chart.title}</h3>
    {chart.kind === "architecture" && <Architecture chart={chart} />}
    {chart.kind === "collection" && <Collection chart={chart} />}
    {chart.kind === "tracing" && <Tracing chart={chart} />}
    {chart.kind === "lifecycle" && <ol className="lifecycle-copy">{chart.footer?.map((item, i) => <li key={item.title}><span className="chart-number">{String(i + 1).padStart(2, "0")}</span><div><h4>{item.title}</h4><p>{item.body}</p></div></li>)}</ol>}
    {chart.id === "soda-engine" && chart.items && <Items chart={chart} />}
    {chart.steps && <Steps chart={chart} />}
    {chart.columns && chart.rows && <div>
      <div className="chart-comparison-desktop"><table><thead><tr>{chart.columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{chart.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
      <dl className="chart-comparison-mobile">{chart.rows.map(row => <div key={row[0]}><dt>{row[0]}</dt><dd>{row.slice(1).map((cell, i) => <div key={i}><strong>{chart.columns?.[i + 1]}</strong><p>{cell}</p></div>)}</dd></div>)}</dl>
    </div>}
    {chart.items && chart.id !== "soda-engine" && <Items chart={chart} />}
    {chart.note && <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">{chart.note}</figcaption>}
  </figure>;
}
function Items({ chart }: { chart: DetailChart }) {
  return <dl className="chart-insights">{chart.items?.map((item, i) => <div key={item.title}><span className="chart-number">{String(i + 1).padStart(2, "0")}</span><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl>;
}
export function DetailCharts({ charts }: { charts: DetailChart[] }) {
  return <div className="detail-charts">{charts.map(chart => <Chart key={chart.id} chart={chart} />)}</div>;
}
