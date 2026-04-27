import type { Metadata } from "next";
import "./globals.css";
import { displayFont, bodyFont, monoFont } from "./fonts";

export const metadata: Metadata = {
  title: "Nocti Labs - Commerce and Technology Studio for the AI era",
  description:
    "We specialize in engineered commerce solutions for the next generation of digital businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <head>
        <link rel="preload" href="/noctiLabsBackgroundInnerLanding.svg" as="image" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
