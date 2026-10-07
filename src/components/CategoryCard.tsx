import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/news";
import { formatBanglaDate } from "@/lib/formatDate";

type Props = {
    article: Article;
};

export default function CategoryCard({ article }: Props) {
    return (
        <article className="group border border-gray-200 rounded-lg p-3 hover:shadow-md transition h-full flex flex-col">
            <Link
                href={`/news/${article.id}`}
                className="flex flex-col h-full"
            >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded flex-shrink-0">
                    <Image
                        src={article.imageUrl}
                        alt={article.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Content */}
                <div className="mt-2 flex flex-col flex-1">
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

                    {/* Date — সবসময় নিচে */}
                    <p className="text-xs text-gray-500 mt-auto pt-2">
                        {formatBanglaDate(article.firstPublished)}
                    </p>
                </div>
            </Link>
        </article>
    );
}