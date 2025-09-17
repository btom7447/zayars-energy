import { Poppins, Montserrat, Babylonica } from "next/font/google";
import "./globals.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Load fonts with proper configuration
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const babylonica = Babylonica({
  variable: "--font-babylonica", 
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Zayars Energy",
  description: "Powering the Future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable} ${babylonica.variable}`}>
      <body className="font-montserrat antialiased">
        <Header />
        <main className="bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}