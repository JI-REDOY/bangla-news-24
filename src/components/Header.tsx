import Image from "next/image";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import AuthButtons from "./AuthButtons";      // ← নতুন import

type NewsItem = {
    id: string;
    title: string;
    link: string;
};

const Header = async () => {
    // Server-side fetch — HTML-এর সাথেই marquee content আসবে
    let news: NewsItem[] = [];
    try {
        const res = await fetch(
            "https://news-api-v2.vercel.app/api/news?limit=10",
            { next: { revalidate: 300 } }
        );
        const data = await res.json();
        news = data.data;
    } catch (err) {
        console.error("Marquee fetch failed:", err);
    }

    return (
        <header className="w-full bg-white border-b border-gray-200">
            {/* Top Row */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="hidden md:block w-40"></div>

                <div className="flex flex-col items-center flex-1">
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="/R-logo1.jpg"
                            alt="Bangla News 24"
                            width={38}
                            height={38}
                            className="rounded-lg object-contain"
                        />
                        <h1 className="text-xl md:text-3xl font-bold text-[#c1121f] whitespace-nowrap">
                            Bangla News 24
                        </h1>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mt-1 whitespace-nowrap">
                        শুক্রবার, ২ অক্টোবর, ২০২৬
                    </p>
                </div>

                {/* ✅ Auth Buttons — dynamic (session-aware) */}
                <AuthButtons />
            </div>

            {/* Bottom Row: Navigation */}
            <nav className="border-t border-gray-200">
                <NavLinks />
            </nav>

            {/* Latest News Marquee — data passed as prop */}
            <Marquee news={news} />
        </header>
    );
};

export default Header;