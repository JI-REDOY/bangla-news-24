import { Section } from "@/types/news";
import HeadlineOnly from "./HeadlineOnly";
import HeroCard from "./HeroCard";

type Props = {
    section: Section;
};

export default function TopSection({ section }: Props) {
    // প্রথম article = Hero
    // বাকি = Headline
    const [hero, ...restArticles] = section.articles;

    if (!hero) return null;

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT: Hero (articles[0]) */}
                <div>
                    <HeroCard article={hero} />
                </div>

                {/* RIGHT: Headlines (articles[1..5]) */}
                <div className="space-y-3">
                    {restArticles.slice(0, 5).map((article, index) => (
                        <HeadlineOnly
                            key={article.id}
                            article={article}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}