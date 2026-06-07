import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Belaca Trading | Uganda–Kenya Agricultural Trade",
  description: "Cross-border agricultural trade between Uganda and Kenya. Fresh produce, reliable logistics, transparent pricing.",
  keywords: "agricultural trade, Uganda, Kenya, cross-border, produce, avocado, beans, Mbale, Busia",
  authors: [{ name: "Belaca Trading Ltd" }],
  openGraph: {
    title: "Belaca Trading",
    description: "Uganda–Kenya Agricultural Trade Platform",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#003DA5" />
      </head>
      <body>{children}</body>
    </html>
  );
}
