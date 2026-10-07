import { notFound } from "next/navigation";
import { CategoryResponse } from "@/types/news";
import SectionTitle from "@/components/SectionTitle";
import CategoryCard from "@/components/CategoryCard";
import VideoCard from "@/components/VideoCard";

type Params = Promise<{ slug: string }>;

async function getCategory(slug: string): Promise<CategoryResponse | null> {
    try {
        const res = await fetch(
            `https://news-api-v2.vercel.app/api/category/${slug}`,
            { next: { revalidate: 300 } }
        );

        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("Category fetch failed:", err);
        return null;
    }
}

export default async function CategoryPage({ params }: { params: Params }) {
    const { slug } = await params;
    const category = await getCategory(slug);

    if (!category || !category.success) {
        notFound();
    }

    // slug === "video" হলে VideoCard use করবো
    const isVideo = slug === "video";
    const CardComponent = isVideo ? VideoCard : CategoryCard;

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <SectionTitle title={category.title} />

            <p className="text-sm text-gray-500 mb-6">
                মোট {category.count} টি {isVideo ? "ভিডিও" : "খবর"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {category.data.map((article) => (
                    <CardComponent key={article.id} article={article} />
                ))}
            </div>
        </main>
    );
}