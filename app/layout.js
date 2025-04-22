import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
<<<<<<< HEAD
import Header from "@/app/header/page";


=======
import Script from "next/script";
>>>>>>> ad71e9fb9358202de220c3bd2e2dbb33c9a937b3
=======
>>>>>>> 8a0bc6e9f7810a64536b0335014b221e854f03da

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

        <link rel="icon" href="/favicon.ico" sizes="any" />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
>>>>>>> ad71e9fb9358202de220c3bd2e2dbb33c9a937b3
        {children}

        <script src="//code.tidio.co/8jpdhmhglwc0sfka7q6kltnmeazvydai.js" async></script>
      </body>
    </html>
  );
}