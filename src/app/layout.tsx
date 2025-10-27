import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutHeader from "./components/layout-header";
import '@ant-design/v5-patch-for-react-19';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encaik World",
  description: "「Hello Encaik World」—— 一个安放热爱与探索的角落 🌟",
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
