import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euler - Huawei ICT Competition Arena",
  description: "Official competitive quiz and exam preparation platform for the Huawei ICT Competition 2026–2027.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-rose-600 selection:text-white">
        <div className="fixed inset-0 radial-glow pointer-events-none z-0" />
        <div className="fixed inset-0 subtle-grid pointer-events-none z-0 opacity-50" />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
