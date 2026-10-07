"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

type NewsItem = {
    id: string;
    title: string;
    link: string;
};

const Marquee = ({ news }: { news: NewsItem[] }) => {
    if (!news || news.length === 0) return null;

    const combinedText = news
        .map((item) => item.title.trim())
        .join("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0");

    return (
        <div className="w-full bg-[#c1121f] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
                {/* Left Label */}
                <div className="bg-white text-[#c1121f] font-bold text-sm px-3 py-1.5 whitespace-nowrap flex-shrink-0">
                    সর্বশেষ
                </div>

                {/* Marquee */}
                <div className="flex-1 overflow-hidden">
                    <MarqueeText
                        duration={10}
                        direction="right"
                        className="text-sm"
                        pauseOnHover
                    >
                        {combinedText}
                    </MarqueeText>
                </div>
            </div>
        </div>
    );
};

export default Marquee;