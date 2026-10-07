import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";

const notoSerifBengali = Noto_Serif_Bengali({
    variable: "--font-noto-serif-bengali",
    subsets: ["bengali", "latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Bangla News 24",
    description: "বাংলা সংবাদের নির্ভরযোগ্য ঠিকানা",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="bn" className={`${notoSerifBengali.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col font-sans">
                <ToastProvider>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <ToastContainer />
                </ToastProvider>
            </body>
        </html>
    );
}