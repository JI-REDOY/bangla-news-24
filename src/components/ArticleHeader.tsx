import Image from "next/image";
import { ArticleDetail } from "@/types/news";
import { formatBanglaDate } from "@/lib/formatDate";

type Props = {
    article: ArticleDetail;
};

export default function ArticleHeader({ article }: Props) {
    const primaryByline = article.byline[0];
    const primaryTopic = article.topics[0];

    return (
        <header className="mb-8">
            {/* Category */}
            {primaryTopic && (
                <span className="text-sm font-bold text-[#c1121f]">
                    {primaryTopic.name}
                </span>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 leading-tight">
                {article.title}
            </h1>

            {/* Byline + Date */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-600 pb-4 border-b border-gray-200">
                {primaryByline && (
                    <span className="font-medium">
                        {primaryByline.name}
                        {primaryByline.role && (
                            <span className="text-gray-500">
                                , {primaryByline.role}
                            </span>
                        )}
                    </span>
                )}
                <span>•</span>
                <span>{formatBanglaDate(article.firstPublished)}</span>
            </div>

            {/* Hero Image */}
            {article.imageUrl && (
                <div className="relative aspect-video overflow-hidden rounded-lg mt-6 bg-gray-100">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        priority
                        className="object-cover"
                    />
                </div>
            )}
        </header>
    );
}