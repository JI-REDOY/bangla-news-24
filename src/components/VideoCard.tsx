import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/news";
import { formatBanglaDate } from "@/lib/formatDate";

type Props = {
    article: Article;
};

export default function VideoCard({ article }: Props) {
    return (
        <article className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition h-full flex flex-col">
            <Link href={`/news/${article.id}`} className="flex flex-col h-full">
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    <Image
                        src={article.imageUrl}
                        alt={article.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                            <svg
                                className="w-5 h-5 text-[#c1121f] ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                    <span className="text-xs font-bold text-[#c1121f]">
                        {article.category}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-gray-900 mt-1 leading-snug group-hover:text-[#c1121f] transition line-clamp-3">
                        {article.title}
                    </h4>
                    {article.description && (
                        <p className="text-xs text-gray-600 mt-1 leading-snug line-clamp-2">
                            {article.description}
                        </p>
                    )}
                    <p className="text-xs text-gray-500 mt-auto pt-2">
                        {formatBanglaDate(article.firstPublished)}
                    </p>
                </div>
            </Link>
        </article>
    );
}