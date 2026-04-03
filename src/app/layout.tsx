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
      <body>{children}</body>
    </html>
  );
}
