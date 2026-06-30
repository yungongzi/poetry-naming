import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "引诗为名 · 取千年诗韵，赐一生嘉名",
  description:
    "从《诗经》《楚辞》到唐宋诗词与诸子典籍，为新生儿寻一个有根基的好名字。引诗为名 —— 古籍诗词起名系统。",
  keywords: [
    "起名",
    "古诗词起名",
    "诗经起名",
    "楚辞起名",
    "唐诗起名",
    "宋词起名",
    "新生儿名字",
    "引诗为名",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=ZCOOL+XiaoWei&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
