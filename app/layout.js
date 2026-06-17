import "./globals.css";

export const metadata = {
  title: "Deutsch Quiz — 기말고사 대비",
  description: "독일어 기말고사 제4강~제9강 퀴즈",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
