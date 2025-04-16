import type { Metadata } from "next";

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
