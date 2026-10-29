import { ArrowDown, ArrowRight, CornerDownLeft, RotateCcw } from "lucide-react";
import { chartCopy, type DetailChart } from "@/content/showcase";
import { VideoPlayer } from "./VideoPlayer";

const num = (i: number) => String(i + 1).padStart(2, "0");

function Architecture({ chart }: { chart: DetailChart }) {
  return <div className="architecture-diagram">
    <p className="chart-kicker">{chartCopy.sgts}</p>
    <div className="architecture-columns">
      <div>
        <div className="architecture-group"><h4 className="chart-column-title">{chartCopy.platforms}</h4>
          {chart.groups?.slice(0, 3).map(group => <div className="architecture-tier" key={group.title}>
            <div className="architecture-labels">{group.labels.map(label => <span className={label === "Resiliency" ? "resiliency-label" : ""} key={label}>{label}</span>)}<span className="more" aria-hidden>...</span></div>
            <h5>{group.title}</h5>
          </div>)}
        </div>
        <div className="stackops-anchor"><span className="stackops-connector" aria-hidden /><strong>{chartCopy.stackops}</strong><p>{chartCopy.resiliency}</p><p>{chartCopy.maturity}</p></div>
      </div>
      <div className="architecture-group apps"><h4 className="chart-column-title">{chartCopy.applications}</h4>{chart.groups?.slice(3).map(group => <div className="architecture-tier application-tier" key={group.title}><h5>{group.title}</h5><ul>{group.labels.map(label => <li key={label}>{label}</li>)}<li className="more" aria-hidden>⋮</li></ul></div>)}</div>
    </div>
  </div>;
}
function Collection({ chart }: { chart: DetailChart }) {
  return <div className="collection-flow">
    {chart.groups?.map((group, i) => <div className={`collection-column collection-${i}`} key={group.title}>
      <h4 className="chart-column-title"><span className="chart-number">{num(i)}</span>{group.title}</h4>
      <ul className="collection-labels">{group.labels.map(label => <li key={label}>{label}</li>)}</ul>
      {chart.footer?.[i] && <div className="collection-footer"><h5>{chart.footer[i]?.title}</h5><p>{chart.footer[i]?.body}</p></div>}
    </div>)}
    <div className="collection-arrow" aria-hidden><ArrowRight /><ArrowDown /></div>
  </div>;
}
function Tracing({ chart }: { chart: DetailChart }) {
  return <div className="tracing-diagram"><p className="trace-context">{chartCopy.request}</p><div className="tracing-providers">{chart.groups?.map(group => <div className="tracing-provider" key={group.title}><h4>{group.title}</h4><p className="trace-app">{group.labels[0]}</p><ArrowDown aria-hidden /><p className="trace-tool">{group.labels[1]}</p></div>)}</div><div className="trace-bus" aria-hidden /><div className="trace-destination"><p className="chart-kicker">{chartCopy.stackops}</p><h4>{chartCopy.central}</h4><p>{chartCopy.centralBody}</p></div></div>;
}
function Hub({ chart }: { chart: DetailChart }) {
  const [sources, signals] = chart.groups ?? [];
  return <div className="hub-chart">
    <div className="hub-row">
      <div className="hub-node">{sources?.labels.map(l => <span key={l}>{l}</span>)}</div>
      <ArrowRight aria-hidden className="hub-arrow" />
      <div className="hub-signals">{signals?.labels.map(l => <span key={l}>{l}</span>)}</div>
      <ArrowRight aria-hidden className="hub-arrow" />
      <div className="hub-core"><strong>{chart.center?.title}</strong><p>{chart.center?.body}</p></div>
      <ArrowRight aria-hidden className="hub-arrow" />
      <div className="hub-outcomes">{chart.items?.map(it => <div key={it.title}><h5>{it.title}</h5><p>{it.body}</p></div>)}</div>
    </div>
    {chart.footer && <div className="hub-pillars">{chart.footer.map(f => <div key={f.title}><h5>{f.title}</h5><p>{f.body}</p></div>)}</div>}
  </div>;
}
function Cards({ chart }: { chart: DetailChart }) {
  return <div className={`card-grid card-count-${chart.items?.length ?? 0} ${chart.tone === "problem" ? "card-problem" : ""}`}>
    {chart.items?.map((it, i) => <div key={it.title}><span className="chart-number">{num(i)}</span><h4>{it.title}</h4><p>{it.body}</p></div>)}
  </div>;
}
function Pipeline({ chart }: { chart: DetailChart }) {
  return <div className="pipeline-chart">
    <ol className={`pipeline-steps steps-${chart.steps?.length ?? 0}`}>{chart.steps?.map((s, i) => <li key={s.title} className={s.requiresApproval ? "approval-step" : ""}>
      <span className="chart-number">{num(i)}</span><h4>{s.title}</h4><p>{s.body}</p>
      {i < (chart.steps?.length ?? 0) - 1 && <ArrowRight aria-hidden className="pipeline-arrow" />}
    </li>)}</ol>
    {chart.loop && <p className="pipeline-loop"><RotateCcw aria-hidden />{chart.loop}</p>}
    {chart.items && <div className="pipeline-applied">{chart.itemsHeading && <h5>{chart.itemsHeading}</h5>}<dl>{chart.items.map(it => <div key={it.title}><dt>{it.title}</dt><dd>{it.body}</dd></div>)}</dl></div>}
  </div>;
}
function Journey({ chart }: { chart: DetailChart }) {
  return <div className="journey-chart">
    <ol className={`steps-${chart.steps?.length ?? 0}`}>{chart.steps?.map((s, i) => <li key={s.title}><span className="journey-dot">{i + 1}</span><h4>{s.title}</h4><p>{s.body}</p></li>)}</ol>
    {chart.center && <div className="journey-base"><strong>{chart.center.title}</strong><p>{chart.center.body}</p></div>}
  </div>;
}
function Stages({ chart }: { chart: DetailChart }) {
  return <ol className="stage-strip">{chart.groups?.map((g, i) => <li key={g.title}>
    <span className="chart-number">{num(i)}</span><h4>{g.title}</h4>
    <ul>{g.labels.map(l => <li key={l}>{l}</li>)}</ul>
    {chart.footer?.[i] && <p>{chart.footer[i]?.body}</p>}
  </li>)}</ol>;
}
function Engine({ chart }: { chart: DetailChart }) {
  return <div className="engine-chart">
    <div className="engine-checks">{chart.items?.map(it => <div key={it.title}><h4>{it.title}</h4><p>{it.body}</p></div>)}</div>
    <ArrowDown aria-hidden className="engine-arrow" />
    <div className="engine-outputs">{chart.footer?.map((f, i) => <div key={f.title} className={i === 0 ? "engine-primary" : ""}><h4>{f.title}</h4><p>{f.body}</p></div>)}</div>
    <div className="engine-grades">{chart.grades?.map(g => <div key={g.grade} className={`grade grade-${g.grade.toLowerCase()}`}><strong>{g.grade}</strong><span>{g.range}</span><span>{g.label}</span></div>)}</div>
  </div>;
}
function BeforeAfter({ chart }: { chart: DetailChart }) {
  return <div className="before-after">
    {[1, 2].map(col => <div key={col} className={col === 1 ? "ba-before" : "ba-after"}>
      <h4>{chart.columns?.[col]}</h4>
      <dl>{chart.rows?.map(r => <div key={r[0]}><dt>{r[0]}</dt><dd>{r[col]}</dd></div>)}</dl>
    </div>)}
    <ArrowRight aria-hidden className="ba-arrow" />
  </div>;
}
function Quadrant({ chart }: { chart: DetailChart }) {
  return <div className="quadrant-chart">
    {chart.items?.map((it, i) => <div key={it.title} className={`quad quad-${i}`}><span className="chart-number">{num(i)}</span><h4>{it.title}</h4><p>{it.body}</p></div>)}
    <div className="quad-core"><strong>{chart.center?.title}</strong>{chart.center?.body && <span>{chart.center.body}</span>}</div>
  </div>;
}
function Cycle({ chart }: { chart: DetailChart }) {
  return <div className="cycle-ring">
    <ol>{chart.steps?.map((s, i) => <li key={s.title} className={`ring-${i}`}><span className="chart-number">{num(i)}</span><h4>{s.title}</h4><p>{s.body}</p></li>)}</ol>
    <div className="ring-core" aria-hidden><CornerDownLeft /><span>{chartCopy.cycle}</span></div>
  </div>;
}
function Report({ chart }: { chart: DetailChart }) {
  const r = chart.report;
  if (!r) return null;
  return <div className="report-card">
    <p className="report-sample">{r.sampleLabel}</p>
    <div className="report-head">
      <div className={`report-grade grade-${r.grade.toLowerCase()}`}><strong>{r.grade}</strong><span>{r.gradeLabel}</span></div>
      {r.metrics.map(m => <div key={m.label} className="report-metric"><strong>{m.value}</strong><span>{m.label}</span></div>)}
    </div>
    <div className="report-bars"><h5>{r.barsTitle}</h5>{r.bars.map(b => <div key={b.label} className="report-bar"><span>{b.label}</span><div><i style={{ width: `${b.value}%` }} className={b.value > 75 ? "bar-high" : b.value < 30 ? "bar-low" : ""} /></div><span>{b.value}%</span></div>)}</div>
    <div className="report-recs"><h5>{r.recsTitle}</h5><ol>{r.recs.map((rec, i) => <li key={rec}><span className="chart-number">{num(i)}</span>{rec}</li>)}</ol></div>
  </div>;
}
function Table({ chart }: { chart: DetailChart }) {
  return <div>
    <div className="chart-comparison-desktop"><table><thead><tr>{chart.columns?.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{chart.rows?.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
    <dl className="chart-comparison-mobile">{chart.rows?.map(row => <div key={row[0]}><dt>{row[0]}</dt><dd>{row.slice(1).map((cell, i) => <div key={i}><strong>{chart.columns?.[i + 1]}</strong><p>{cell}</p></div>)}</dd></div>)}</dl>
  </div>;
}
function Steps({ chart }: { chart: DetailChart }) {
  return <div className="chart-flow">
    <ol>{chart.steps?.map((step, i) => <li key={step.title} className={step.requiresApproval ? "approval-step" : ""}><span className="chart-number">{num(i)}</span><div><h4>{step.title}</h4><p>{step.body}</p></div>{i < (chart.steps?.length ?? 0) - 1 && <ArrowDown aria-hidden className="step-arrow" />}</li>)}</ol>
  </div>;
}
function Items({ chart }: { chart: DetailChart }) {
  return <dl className="chart-insights">{chart.items?.map((item, i) => <div key={item.title}><span className="chart-number">{num(i)}</span><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl>;
}
function Video({ chart }: { chart: DetailChart }) {
  const video = chart.video;
  if (!video?.src) return null;
  return <VideoPlayer src={video.src} poster={video.poster} />;
}
function Body({ chart }: { chart: DetailChart }) {
  switch (chart.kind) {
    case "architecture": return <Architecture chart={chart} />;
    case "collection": return <Collection chart={chart} />;
    case "tracing": return <><Tracing chart={chart} /><Items chart={chart} /></>;
    case "lifecycle": return <ol className="lifecycle-copy">{chart.footer?.map((item, i) => <li key={item.title}><span className="chart-number">{num(i)}</span><div><h4>{item.title}</h4><p>{item.body}</p></div></li>)}</ol>;
    case "hub": return <Hub chart={chart} />;
    case "cards": return <Cards chart={chart} />;
    case "pipeline": return <Pipeline chart={chart} />;
    case "journey": return <Journey chart={chart} />;
    case "stages": return <Stages chart={chart} />;
    case "engine": return <><Engine chart={chart} /><Pipeline chart={{ id: chart.id, title: chart.title, steps: chart.steps ?? [] }} /></>;
    case "beforeafter": return <BeforeAfter chart={chart} />;
    case "quadrant": return <Quadrant chart={chart} />;
    case "report": return <Report chart={chart} />;
    case "table": return <Table chart={chart} />;
    case "video": return <Video chart={chart} />;
    default:
      if (chart.cyclic) return <Cycle chart={chart} />;
      return <>{chart.steps && <Steps chart={chart} />}{chart.columns && <Table chart={chart} />}{chart.items && <Items chart={chart} />}</>;
  }
}
function Chart({ chart }: { chart: DetailChart }) {
  return <figure className={`detail-chart chart-${chart.id}`} aria-labelledby={`chart-${chart.id}`}>
    <h3 id={`chart-${chart.id}`} className="chart-title">{chart.title}</h3>
    {chart.intro && <p className="chart-intro">{chart.intro}</p>}
    <Body chart={chart} />
    {chart.note && <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">{chart.note}</figcaption>}
  </figure>;
}
export function DetailCharts({ charts }: { charts: DetailChart[] }) {
  return <div className="detail-charts">{charts.map(chart => <Chart key={chart.id} chart={chart} />)}</div>;
}
