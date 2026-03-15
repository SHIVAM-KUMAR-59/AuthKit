import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionContext from "@/context/SessionContext";
import ServerToastProvider from "@/context/ServerToastProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuthKit",
  description:
    "Full-stack auth boilerplate — Google, GitHub, and Email OTP. Clone it, configure your keys, ship in minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SessionContext>
          <ServerToastProvider>{children}</ServerToastProvider>
        </SessionContext>
      </body>
    </html>
  );
}
