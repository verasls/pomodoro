import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "./GlobalStyles";
import "@/app/index.css";

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "A simple Pomodoro timer application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
