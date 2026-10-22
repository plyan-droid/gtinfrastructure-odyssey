import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { siteMap, ui } from "@/content/showcase";

export function SiteMap({ onJump }: { onJump: (label: string) => void }) {
  return <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild><Button variant="outline" className="rounded-full font-mono text-xs uppercase"><Menu />{ui.siteMap}</Button></DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-64">{siteMap.map(entry => <DropdownMenuItem key={entry.label} onSelect={() => onJump(entry.label)}>{entry.name}</DropdownMenuItem>)}</DropdownMenuContent>
  </DropdownMenu>;
}
