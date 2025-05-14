import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/header/page";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SettleSmart Solutions",
  description: "Legal Dispute Resolution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Script src="//code.tidio.co/8jpdhmhglwc0sfka7q6kltnmeazvydai.js" strategy="lazyOnload" />
        </ThemeProvider>
      </body>
    </html>
  );
}