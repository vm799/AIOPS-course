import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIOps Academy | Agentic Observability Training",
  description: "Professional-grade AIOps curriculum teaching practitioners to architect self-healing, intelligent systems through scenario-based learning.",
  keywords: ["AIOps", "Observability", "SRE", "DevOps", "Incident Management", "ML Operations"],
  authors: [{ name: "Vaishali Mehmi" }],
  openGraph: {
    title: "AIOps Academy",
    description: "You design the future. We clear the way.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
