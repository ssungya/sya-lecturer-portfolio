import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sya-lecturer-portfolio.vercel.app'),
  title: "한국인력경영개발원 | 성영아 대표 전문 강사 포트폴리오",
  description: "한국인력경영개발원 대표 성영아 강사의 포트폴리오입니다. 생성형 AI 활용, HR 조직 성장 교육, MBTI 소통, 리더십, CS, 취업 코칭 등 기업 및 공공기관 맞춤형 교육을 진행합니다.",
  keywords: [
    "성영아", "성영아 강사", "한국인력경영개발원", "소상공인연합회 디지털공인강사",
    "생성형 AI 교육", "업무 생산성 향상", "챗GPT 교육", "노션 활용 교육",
    "HR 교육", "조직 성장 교육", "MBTI 소통", "TA 교류분석", "리더십 교육",
    "팀빌딩", "CS 교육", "민원응대", "스피치 강사", "커리어 코칭", "퍼스널 컬러 교육"
  ],
  openGraph: {
    title: "한국인력경영개발원 | 성영아 대표 전문 강사 포트폴리오",
    description: "생성형 AI, HR 조직 활성화, MBTI 소통, 리더십 등 기업 맞춤형 교육을 기획 · 운영하는 전문 교육 파트너",
    url: "https://sya-lecturer-portfolio.vercel.app", // Fallback URL placeholder
    siteName: "한국인력경영개발원",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "한국인력경영개발원 대표 성영아 포트폴리오",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "한국인력경영개발원 | 성영아 대표 전문 강사 포트폴리오",
    description: "생성형 AI, HR 조직 활성화, MBTI 소통, 리더십 등 기업 맞춤형 교육을 기획 · 운영하는 전문 교육 파트너",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body>{children}</body>
    </html>
  );
}
