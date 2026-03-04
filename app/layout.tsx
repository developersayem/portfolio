import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sayem Molla | Full Stack Engineer",
  description:
    "Portfolio of Sayem Molla — a Full Stack Engineer specializing in building scalable digital products and modern web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
