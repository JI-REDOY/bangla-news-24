import Link from "next/link";

type MostReadArticle = {
    id: string;
    title: string;
};

type Props = {
    articles: MostReadArticle[];
};

// বাংলা সংখ্যা converter
function toBanglaNumber(num: number): string {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
        .toString()
        .split("")
        .map((d) => banglaDigits[parseInt(d)] ?? d)
        .join("");
}

export default function MostRead({ articles }: Props) {
    return (
        <div className="sticky top-4 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">

            {/* Header with red accent */}
            <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#c1121f] rounded-full"></span>
                    সর্বাধিক পঠিত
                </h3>
            </div>

            {/* List */}
            <ol>
                {articles.map((article, index) => (
                    <li
                        key={article.id}
                        className="border-b border-gray-100 last:border-0"
                    >
                        <Link
                            href={`/news/${article.id}`}
                            className="flex gap-4 p-4 hover:bg-gray-50 transition group"
                        >
                            {/* Numbered Badge */}
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#c1121f] text-white text-sm font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                                {toBanglaNumber(index + 1)}
                            </span>

                            {/* Title */}
                            <span className="text-sm md:text-[15px] font-medium text-gray-800 group-hover:text-[#c1121f] transition leading-snug line-clamp-3">
                                {article.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}