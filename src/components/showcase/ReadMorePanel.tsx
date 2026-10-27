import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { customerStories, disclaimer, sources, ui, type Detail } from "@/content/showcase";

export function ReadMorePanel({ detail, onClose, onRestoreFocus }: { detail: Detail | null; onClose: () => void; onRestoreFocus: () => void }) {
  const customer = customerStories.some(s => s.id === detail?.id);
  return (
    <Dialog open={Boolean(detail)} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="detail-modal w-[calc(100%-2rem)] max-w-[72rem] gap-0 overflow-hidden rounded-lg bg-popover p-0 md:w-[72vw]" onCloseAutoFocus={event => { event.preventDefault(); onRestoreFocus(); }}>
        {detail && <>
          <header className="shrink-0 border-b px-6 pb-5 pt-8 pr-14 md:px-10 md:pr-16">
            <p className="eyebrow text-primary">{detail.eyebrow}</p>
            <DialogTitle className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">{detail.readMore.title}</DialogTitle>
            <DialogDescription className="sr-only">{detail.eyebrow}</DialogDescription>
          </header>
          <div className="detail-scroll overflow-y-auto overscroll-contain px-6 py-7 md:px-10">
            <div className="space-y-7">{detail.readMore.sections.map(section => <section key={section.heading}>
              <h3 className="text-lg font-medium">{section.heading}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">{section.body}</p>
              {section.links && <ul className="mt-3 space-y-2">{section.links.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-primary underline underline-offset-4">{link.label} ↗</a></li>)}</ul>}
            </section>)}</div>
            {customer && <a href={sources.stories} target="_blank" rel="noreferrer" className="mt-7 inline-block text-sm text-primary underline underline-offset-4">{ui.source} ↗</a>}
            <p className="mt-8 border-t pt-5 text-xs leading-relaxed text-muted-foreground">{disclaimer}</p>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  );
}
