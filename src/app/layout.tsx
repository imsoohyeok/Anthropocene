import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "SavEnergy";
const description =
  "일상생활 속 에너지 절약 방법을 미니게임을 통해 알아보세요!";

export const metadata: Metadata = {
  metadataBase: new URL("https://savenergy-inlife.vercel.app"),
  title,
  description,
  keywords: [
    "기후변화",
    "에너지 절약",
    "탄소중립",
    "환경 교육",
    "인터랙티브 웹",
    "미니게임",
  ],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
