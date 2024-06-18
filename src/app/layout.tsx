import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HomeButton } from "@/components/home-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thousand Sons",
  description: "Thousand Sons list builder and command bunker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="h-full flex flex-row">
          <div className="flex flex-col mr-1 text-lg bg-slate-700 text-stone-200">
            <HomeButton />
          </div>
          <div className="w-full overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
