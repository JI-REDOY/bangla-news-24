import { Section } from "@/types/news";
import SectionTitle from "./SectionTitle";
import CategoryCard from "./CategoryCard";

type Props = {
    section: Section;
};

export default function CategorySection({ section }: Props) {
    return (
        <section>
            <SectionTitle title={section.title} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.articles.map((article) => (
                    <CategoryCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}