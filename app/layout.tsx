import type { Metadata } from "next";
import "./globals.css";
// import { Roboto } from "next/font/google";
//
// const myfonts = Roboto({
//     subsets: ["latin"],
//     weight: '100',
// })

export const metadata: Metadata = {
  title: "HEFACEIT.RU - Client for Faceit",
  description: "We develop a client for Faceit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
