import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutHeader from "./components/Header";

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
        <AntdRegistry>
          <Layout className="w-screen h-screen bg-gray-200">
            <LayoutHeader />
            <Content className="p-8 overflow-auto">
              {children}
            </Content>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
