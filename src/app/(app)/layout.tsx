import CommandCenterShell from "@/components/shell/CommandCenterShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <CommandCenterShell>{children}</CommandCenterShell>;
}
