import "@radix-ui/themes/styles.css";

import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/AuthProvider";
import "./globals.css";
import "./theme-config.css";
import ReactQueryProvider from "./Providers/ReactQueryProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description:
    "A comprehensive tool designed to manage and track problems, bugs, or assign issues.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ReactQueryProvider>
          <AuthProvider>
            <Theme accentColor="blue" grayColor="sand" scaling="105%">
              <NavBar />
              <Container>
                <main className="p-5">{children}</main>
              </Container>
            </Theme>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
