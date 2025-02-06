import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./globals.css";
import Navbar from "@/components/Navbar";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper"; 
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Platform",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloProviderWrapper>
          <Provider>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
          </Provider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
