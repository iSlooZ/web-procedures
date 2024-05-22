import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../(pages)/styles.css"
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "How Know - Bienvenido a la mejor aplicación de procedimientos.",
  description: "Obten la mejor experiencia al compartir los procedimientos a tu empresa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
