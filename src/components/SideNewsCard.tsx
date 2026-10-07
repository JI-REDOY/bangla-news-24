import Link from "next/link";
import { Article } from "@/types/news";

type Props = {
    article: Article;
};

export default function SideNewsCard({ article }: Props) {
    return (
        <article className="border-b border-gray-200 pb-3 last:border-0">
            <Link href={`/news/${article.id}`} className="block group">
                <span className="text-xs font-bold text-[#c1121f]">
                    {article.category}
                </span>
                <h4 className="text-base font-semibold text-gray-900 mt-0.5 group-hover:text-[#c1121f] transition line-clamp-3">
                    {article.title}
                </h4>
            </Link>
        </article>
    );
}