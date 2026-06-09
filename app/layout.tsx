import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Belaca Trading", template: "%s | Belaca Trading" },
  description: "Uganda–Kenya cross-border agricultural trade. Fresh produce, reliable logistics.",
  keywords: ["agricultural trade","Uganda","Kenya","avocado","beans","Mbale","Busia","cross-border"],
  themeColor: "#003DA5",
};
export const viewport: Viewport = { width:"device-width", initialScale:1, maximumScale:5 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
