import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AITZAZ AI 2070 — Personal AI Operating System",
  description:
    "A personal AI operating system: an AI brain that plans goals, uses specialized agents and tools, controls the computer with permission, remembers context and verifies its work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#060913] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
