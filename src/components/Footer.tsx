import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();
    const banglaYear = year
        .toString()
        .split("")
        .map((d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)])
        .join("");

    return (
        <footer className="w-full bg-white border-t border-gray-200 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
                <p>© {banglaYear} Bangla News 24 — সর্বস্বত্ব সংরক্ষিত</p>
                <p>
                    তথ্যসূত্র:{" "}
                    <Link
                        href="https://www.bbc.com/bengali"
                        target="_blank"
                        className="text-[#c1121f] hover:underline transition"
                    >
                        BBC Bangla
                    </Link>
                </p>
            </div>
        </footer>
    );
}