import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Aurora from "@/components/Aurora";

export const metadata: Metadata = {
  title: "Pater Noster - The London Review of Books Store",
  description: "Authentic London Review of Books merchandise. Shop curated books, exclusive merchandise, and subscriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          <Preloader>
            <Aurora className="fixed inset-0 -z-10 pointer-events-none" />
            <Header />
            <main>{children}</main>
            <Footer />
          </Preloader>
          {/* Cursor at body level — always on top, never trapped by preloader */}
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
