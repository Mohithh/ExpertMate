import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Header from "@/app/header/page";


=======
import Script from "next/script";
>>>>>>> ad71e9fb9358202de220c3bd2e2dbb33c9a937b3

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
    <html lang="en">
<<<<<<< HEAD
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
=======
      <head>
        {/* ✅ Replace below with your actual chatbot ID for test */}
        <Script
          id="chatbase-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.chatbaseConfig = {
                chatbotId: "your-actual-chatbot-id-here"
              };
            `,
          }}
        />
        <Script
          src="https://www.chatbase.co/embed.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
>>>>>>> ad71e9fb9358202de220c3bd2e2dbb33c9a937b3
        {children}
      </body>
    </html>
  );
}
