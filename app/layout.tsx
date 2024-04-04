"use client";
import "./globals.css";
import { Lato } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";
const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const headerPatterns = [
    /^\/booking$/, // Matches only "/booking"
    /^\/ticket$/,
    /^\/history$/,
    /^\/profile$/,
    // /^\/booking\/((0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}|(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4})$/,
    /^\/booking\/(\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))$/

  ];

  const showHeader = headerPatterns.some((pattern) =>
    pattern.test(currentPath)
  );
  return (
    <html lang="en">
      <body className={lato.className}>
        {showHeader && <Navbar />}
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
