import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/news";
import { formatBanglaDate } from "@/lib/formatDate";

type Props = {
    article: Article;
};

export default function HeroCard({ article }: Props) {
    return (
        <article className="group border border-gray-200 rounded-lg p-3 hover:shadow-md transition h-full flex flex-col">
            <Link href={`/news/${article.id}`} className="flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded flex-shrink-0">
                    <Image src={article.imageUrl} alt={article.imageAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" priority className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="mt-3 flex flex-col flex-1">
                    <span className="text-xs font-bold text-[#c1121f]">
                        {article.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-1 leading-snug group-hover:text-[#c1121f] transition line-clamp-3">
                        {article.title}
                    </h3>
                    {article.description && (
                        <p className="text-xs md:text-sm text-gray-700 mt-2 leading-relaxed line-clamp-3">
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