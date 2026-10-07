import { Section } from "@/types/news";
import TopSection from "@/components/TopSection";
import SelectedSection from "@/components/SelectedSection";
import CategorySection from "@/components/CategorySection";
import VideoSection from "@/components/VideoSection";
import MostRead from "@/components/MostRead";

async function getSections(): Promise<Section[]> {
    const res = await fetch(
        "https://news-api-v2.vercel.app/api/news/sections",
        { next: { revalidate: 300 } }
    );
    const data = await res.json();
    return data.data;
}

// যেই section গুলো homepage-এ দেখাবো (whitelist)
const ALLOWED_SECTIONS = [
    "বাংলাদেশ",
    "ভারত",
    "বিশ্ব",
    "স্বাস্থ্য",
    "অন্যান্য খবর",
];

export default async function Home() {
    const sections = await getSections();

    const topSection = sections.find((s) => s.title === "প্রধান খবর");
    const selectedSection = sections.find((s) => s.title === "নির্বাচিত খবর");
    const videoSection = sections.find((s) => s.title === "ভিডিও");

    // শুধু allowed section গুলো
    const categorySections = sections.filter((s) =>
        ALLOWED_SECTIONS.includes(s.title)
    );

    const mostRead =
        topSection?.articles.slice(0, 10).map((a) => ({
            id: a.id,
            title: a.title,
        })) || [];

    if (!topSection) {
        return <main className="p-8">Loading...</main>;
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                    <TopSection section={topSection} />

                    {selectedSection && (
                        <SelectedSection section={selectedSection} />
                    )}

                    {categorySections.map((section) => (
                        <CategorySection key={section.title} section={section} />
                    ))}

                    {videoSection && <VideoSection section={videoSection} />}
                </div>

                <aside className="lg:col-span-1">
                    <MostRead articles={mostRead} />
                </aside>
            </div>
        </main>
    );
}