import type { Metadata } from "next";
import "./globals.scss";
import Footer from "./Footer";
import Navbar from "./Navbar";

export const metadata: Metadata = {
  title: "Constellation Cards",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container is-fluid mt-6 pt-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
