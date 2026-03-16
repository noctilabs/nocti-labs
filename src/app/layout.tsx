import type { Metadata } from "next";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import NavWrapper from "@/components/layout/NavWrapper";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { displayFont, bodyFont, monoFont } from "./fonts";
import { draftMode } from "next/headers";
import { VisualEditing } from "@sanity/visual-editing/react";

export const metadata: Metadata = {
  title: "Nocti Labs - Commerce and Technology Studio for the AI era",
  description:
    "We specialize in engineered commerce solutions for the next generation of digital businesses.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <ScrollToTop />
        <NavWrapper />
        {children}
        <SanityLive />
        {isEnabled && <VisualEditing portal />}
      </body>
    </html>
  );
}
