import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { siteMap } from "@/content/showcase";

export function SiteMap({ onJump, onOpen }: { onJump: (label: string) => void; onOpen: (id: "elastic" | "dynatrace") => void }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="rounded-full border px-4 py-2 font-mono text-xs tracking-widest text-foreground transition hover:border-primary hover:text-primary">
        ☰ SITE MAP
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {siteMap.map((e) => (
          <DropdownMenuItem
            key={e.name}
            onSelect={() => (e.panel ? onOpen(e.panel) : e.label && onJump(e.label))}
            className={e.panel ? "pl-6 text-muted-foreground" : ""}
          >
            {e.name}
            {e.panel && <span className="ml-auto font-mono text-[10px]">PANEL</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
