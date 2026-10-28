import { useState } from "react";
import { ArrowDown, ArrowRight, Maximize2, Minimize2, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ui, type DetailChart } from "@/content/showcase";

function Chart({ chart }: { chart: DetailChart }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <figure className="border-b pb-7 last:border-b-0" aria-labelledby={`chart-${chart.id}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 id={`chart-${chart.id}`} className="text-lg font-medium">{chart.title}</h3>
        {chart.image && <Button variant="ghost" size="icon" className="shrink-0" aria-label={expanded ? ui.collapseChart : ui.expandChart} title={expanded ? ui.collapseChart : ui.expandChart} aria-pressed={expanded} onClick={() => setExpanded(v => !v)}>
          {expanded ? <Minimize2 /> : <Maximize2 />}
        </Button>}
      </div>
      {chart.image && <div className="overflow-x-auto rounded-lg border bg-background" tabIndex={expanded ? 0 : undefined}>
        <img src={chart.image.src} alt={chart.image.alt} loading="lazy" className={expanded ? "block w-[1400px] max-w-none" : "block h-auto w-full"} />
      </div>}
      {chart.steps && <ol className="grid gap-3 md:flex md:items-stretch">
        {chart.steps.map((step, i) => <li key={step.title} className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row">
          <div className={`flex-1 rounded-lg border p-4 ${step.requiresApproval ? "border-warn/60 bg-warn/5" : "border-healthy/30 bg-healthy/5"}`}>
            <p className={`font-mono text-xs ${step.requiresApproval ? "text-warn" : "text-healthy"}`}>{String(i + 1).padStart(2, "0")}</p>
            <h4 className="mt-2 text-sm font-semibold">{step.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.body}</p>
          </div>
          {i < (chart.steps?.length ?? 0) - 1 && <><ArrowRight aria-hidden className="hidden size-4 shrink-0 self-center text-primary md:block" /><ArrowDown aria-hidden className="size-4 self-center text-primary md:hidden" /></>}
        </li>)}
      </ol>}
      {chart.cyclic && <Repeat2 aria-hidden className="mx-auto mt-3 size-5 text-primary" />}
      {chart.columns && chart.rows && <div>
        <div className="hidden overflow-x-auto rounded-lg border md:block">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="bg-secondary text-healthy"><tr>{chart.columns.map(column => <th key={column} className="p-4 font-medium first:w-[24%]">{column}</th>)}</tr></thead>
            <tbody>{chart.rows.map(row => <tr key={row[0]} className="border-t even:bg-muted/30">{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="p-4 align-top font-medium">{cell}</th> : <td key={i} className="p-4 align-top leading-relaxed text-foreground/80">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <dl className="divide-y border-y md:hidden">{chart.rows.map(row => <div key={row[0]} className="py-4"><dt className="font-medium text-healthy">{row[0]}</dt><dd className="mt-3 space-y-3 text-sm leading-relaxed">{row.slice(1).map((cell, i) => <div key={i}><p className="font-medium text-primary">{chart.columns?.[i + 1]}</p><p className="mt-1 text-foreground/80">{cell}</p></div>)}</dd></div>)}</dl>
      </div>}
      {chart.items && <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">{chart.items.map(item => <div key={item.title} className="border-l-2 border-primary/50 pl-4"><dt className="text-sm font-medium">{item.title}</dt><dd className="mt-1 text-sm leading-relaxed text-foreground/80">{item.body}</dd></div>)}</dl>}
      <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground">{chart.note}</figcaption>
    </figure>
  );
}

export function DetailCharts({ charts }: { charts: DetailChart[] }) {
  return <div className="mb-8 space-y-7">{charts.map(chart => <Chart key={chart.id} chart={chart} />)}</div>;
}