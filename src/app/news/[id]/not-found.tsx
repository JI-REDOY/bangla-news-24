import Link from "next/link";

export default function NotFound() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                খবরটি পাওয়া যায়নি
            </h1>
            <p className="text-gray-600 mb-6">
                দুঃখিত, আপনি যে খবরটি খুঁজছেন সেটি পাওয়া যায়নি অথবা সরিয়ে ফেলা হয়েছে।
            </p>
            <Link
                href="/"
                className="inline-block bg-[#c1121f] hover:bg-[#a10e19] text-white px-6 py-2 rounded transition"
            >
                হোমপেজে ফিরে যান
            </Link>
        </main>
    );
}