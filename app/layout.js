import './globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';

const geistSans = localFont({
  src: './fonts/Geist-Regular.woff2',
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMono-Regular.woff2',
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata = {
  title: 'SettleSmart Solutions',
  description: 'Legal Dispute Resolution',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src="//code.tidio.co/8jpdhmhglwc0sfka7q6kltnmeazvydai.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
