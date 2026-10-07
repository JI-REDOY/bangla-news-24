import Link from "next/link";
import { Article } from "@/types/news";

type Props = {
    article: Article;
};

export default function HeadlineOnly({ article }: Props) {
    return (
        <article className="border-b border-gray-200 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
            <Link href={`/news/${article.id}`} className="block group">
                <span className="text-xs font-bold text-[#c1121f]">
                    {article.category}
                </span>
                <h4 className="text-sm md:text-base font-bold text-gray-900 mt-1 leading-snug group-hover:text-[#c1121f] transition line-clamp-2">
                    {article.title}
                </h4>
            </Link>
        </article>
    );
}