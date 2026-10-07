import { notFound } from "next/navigation";
import { ArticleDetailResponse } from "@/types/news";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import ArticleTags from "@/components/ArticleTags";

type Params = Promise<{ id: string }>;

async function getArticle(id: string): Promise<ArticleDetailResponse | null> {
    try {
        const res = await fetch(
            `https://news-api-v2.vercel.app/api/article/${id}`,
            { next: { revalidate: 600 } }
        );

        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("Article fetch failed:", err);
        return null;
    }
}

export default async function ArticlePage({ params }: { params: Params }) {
    const { id } = await params;
    const response = await getArticle(id);

    if (!response || !response.success) {
        notFound();
    }

    const article = response.data;

    return (
        <main className="max-w-3xl mx-auto px-4 py-8">
            <ArticleHeader article={article} />

            <ArticleBody blocks={article.body} />

            <ArticleTags tags={article.tags} />

            {/* Source link */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#c1121f] hover:underline"
                >
                    মূল সূত্র: {article.source}
                </a>
            </div>
        </main>
    );
}