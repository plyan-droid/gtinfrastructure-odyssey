import { useEffect, useState } from "react";
import { disclaimer, type Product } from "@/content/showcase";

export function ReadMorePanel({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  const open = !!product;
  return (
    <div className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={product?.readMore.title}
        className={`absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto overscroll-contain border-l bg-popover p-8 transition-transform duration-500 md:p-12 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {product && (
          <>
            <div className="flex items-start justify-between">
              <p className="eyebrow text-primary">{product.eyebrow}</p>
              <button onClick={onClose} className="font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground">CLOSE ✕</button>
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">{product.readMore.title}</h3>
            <div className="mt-8 space-y-7">
              {product.readMore.sections.map((s) => (
                <section key={s.heading}>
                  <h4 className="text-lg font-medium">{s.heading}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  {s.links && (
                    <ul className="mt-3 space-y-1">
                      {s.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noreferrer" className="font-mono text-xs text-primary underline-offset-4 hover:underline">{l.label} ↗</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            {product.id === "elastic" && <Dashboard />}
            <p className="mt-10 border-t pt-6 text-xs text-muted-foreground">{disclaimer}</p>
          </>
        )}
      </aside>
    </div>
  );
}

// Illustrative dashboard with synthetic data, built after mount (no randomness at module scope).
function Dashboard() {
  const [series] = useState(() => Array.from({ length: 32 }, (_, i) => 40 + Math.sin(i / 3) * 18 + (i === 22 ? 45 : 0) + ((i * 7) % 9)));
  const max = Math.max(...series);
  return (
    <div className="mt-10 rounded-xl border bg-card p-5">
      <p className="eyebrow mb-1">ILLUSTRATIVE DASHBOARD · SYNTHETIC DATA</p>
      <div className="mt-4 grid grid-cols-3 gap-3 font-mono">
        {[
          ["events/min", "48.2k"],
          ["error rate", "0.42%"],
          ["p95 latency", "312ms"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border p-3">
            <p className="text-[10px] text-muted-foreground">{k}</p>
            <p className="mt-1 text-lg">{v}</p>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 320 100" className="mt-4 w-full">
        {series.map((v, i) => (
          <rect key={i} x={i * 10 + 1} y={100 - (v / max) * 92} width="7" height={(v / max) * 92} rx="1.5" fill={i === 22 ? "var(--error)" : "var(--primary)"} fillOpacity={i === 22 ? 1 : 0.55} />
        ))}
      </svg>
      <p className="mt-2 font-mono text-[10px] text-muted-foreground">catalog-svc · latency spike correlated with trace 7c2e… (synthetic data)</p>
    </div>
  );
}
