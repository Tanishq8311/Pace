import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pace",
  description: "A fat-loss plan computed from your actual biometrics.",
};

const THEME_INIT = `
try {
  var t = localStorage.getItem('pace-theme');
  var dark = t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', dark);
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,600,700,800&f[]=satoshi@400,500,700,900&display=swap"
          precedence="high"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
