import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "./GlobalStyles";
import "@/app/index.css";

export const metadata: Metadata = {
  keywords: ["pomodoro", "timer", "time management", "productivity"],
  authors: [{ name: "Lucas Veras", url: "https://lveras.com/" }],
  creator: "Lucas Veras",
  openGraph: {
    title: "Pomodoro Timer",
    siteName: "Pomodoro Timer",
    description: "A simple Pomodoro timer application",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}
