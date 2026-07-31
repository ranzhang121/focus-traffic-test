import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "掌控你的时间与未来",
  description: "Stay away from harmful distractions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
