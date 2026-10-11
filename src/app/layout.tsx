import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euler — Competition Quiz Arena",
  description: "The playful, gamified quiz platform for Cloud, Computing, and Network competition preparation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Euler — Competition Quiz Arena",
    description: "Level up your technical track with daily drills, streaks, and competitive leagues.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#ffffff] text-[#100f3e] antialiased selection:bg-[#7c3aed] selection:text-white">
        <div className="flex min-h-screen flex-col bg-[#ffffff]">
          {children}
        </div>
      </body>
    </html>
  );
}
