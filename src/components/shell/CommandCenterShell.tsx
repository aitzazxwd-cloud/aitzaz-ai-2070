import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

/**
 * Command Center shell — wraps every section with sidebar + top bar.
 */
export default function CommandCenterShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-grid flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="scanline relative flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
