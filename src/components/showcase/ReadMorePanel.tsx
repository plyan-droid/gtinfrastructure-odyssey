import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Activity, FileText, Network, Route } from "lucide-react";
import { customerStories, sources, ui, type Detail } from "@/content/showcase";
import { DetailCharts } from "./DetailCharts";

export function ReadMorePanel({
  detail,
  onClose,
  onRestoreFocus,
}: {
  detail: Detail | null;
  onClose: () => void;
  onRestoreFocus: () => void;
}) {
  const customer = customerStories.some((s) => s.id === detail?.id);
  return (
    <Dialog
      open={Boolean(detail)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="detail-modal w-[calc(100%-2rem)] max-w-[72rem] gap-0 overflow-hidden rounded-lg bg-popover p-0 md:w-[72vw]"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onRestoreFocus();
        }}
      >
        {detail && (
          <>
            <header className="shrink-0 border-b px-6 pb-5 pt-8 pr-14 md:px-10 md:pr-16">
              <p className="eyebrow text-primary">{detail.eyebrow}</p>
              <DialogTitle className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
                {detail.readMore.title}
              </DialogTitle>
              <DialogDescription className="sr-only">{detail.eyebrow}</DialogDescription>
            </header>
            <div className="detail-scroll overflow-y-auto overscroll-contain px-6 py-7 md:px-10">
              {detail.readMore.charts && <DetailCharts charts={detail.readMore.charts} />}
              {detail.readMore.cards ? (
                <div>
                  <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
                    {detail.readMore.cards.intro}
                  </p>
                  {detail.readMore.cards.variant === "timeline" ? (
                  <ol className="relative mt-6 grid gap-3 md:grid-cols-5">
                    <span aria-hidden className="absolute left-[1.1rem] top-4 bottom-4 w-px bg-primary/30 md:left-4 md:right-4 md:top-[1.1rem] md:bottom-auto md:h-px md:w-auto" />
                    {detail.readMore.sections.map((section) => {
                      const [num, title] = section.heading.split(": ");
                      return (
                        <li key={section.heading} className="relative flex gap-4 md:flex-col md:gap-3">
                          <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-primary/50 bg-popover font-mono text-xs text-primary">
                            {num}
                          </span>
                          <div>
                            <h3 className="text-base font-semibold">{title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-foreground/75">{section.body}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {detail.readMore.sections.map((section, i) => {
                      const Icon = [FileText, Activity, Route, Network][i % 4] ?? FileText;
                      const [label, question] = section.heading.split(": ");
                      return (
                        <section key={section.heading} className="rounded-lg border bg-card p-5">
                          <div className="flex items-center gap-3">
                            <span className="grid size-9 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                              <Icon className="size-4" />
                            </span>
                            <div>
                              <p className="font-mono text-xs tracking-widest text-primary">{label}</p>
                              <h3 className="text-base font-medium">{question}</h3>
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
                        </section>
                      );
                    })}
                  </div>
                  )}
                  <p className="mt-6 text-sm leading-relaxed text-foreground/85 md:text-base">
                    {detail.readMore.cards.closing}
                  </p>
                  <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
                    {detail.readMore.cards.note}
                  </p>
                </div>
              ) : (
              <div className="space-y-7">
                {detail.readMore.sections.map((section) => (
                  <section key={section.heading}>
                    {section.heading !== detail.readMore.title && (
                      <h3 className="text-lg font-medium">{section.heading}</h3>
                    )}
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/75 md:text-base">
                      {section.body}
                    </p>
                    {section.links && (
                      <ul className="mt-3 space-y-2">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-primary underline underline-offset-4"
                            >
                              {link.label} ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
              )}
              {customer && (
                <a
                  href={sources.stories}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-block text-sm text-primary underline underline-offset-4"
                >
                  {ui.source} ↗
                </a>
              )}

            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
