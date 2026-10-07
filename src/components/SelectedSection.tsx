import { Section } from "@/types/news";
import SectionTitle from "./SectionTitle";
import SelectedCard from "./SelectedCard";

type Props = {
    section: Section;
};

export default function SelectedSection({ section }: Props) {
    return (
        <section>
            <SectionTitle title={section.title} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {section.articles.slice(0, 5).map((article) => (
                    <SelectedCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}