import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encaik Tools",
  description: "Encaik Tools is a collection of tools for developers and enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout className="w-screen h-screen bg-gray-200">
          <Header className="flex flex-row justify-start items-center bg-cyan-950 shadow-lg shadow-blue-500/30">
            <span className="text-gray-100 text-3xl font-bold">Encaik Tools</span>
          </Header>
          <Content className="p-8 overflow-auto">
            {children}
          </Content>
        </Layout>
      </body>
    </html>
  );
}
