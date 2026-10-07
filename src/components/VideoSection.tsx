import Image from "next/image";
import Link from "next/link";
import { Section } from "@/types/news";
import SectionTitle from "./SectionTitle";

type Props = {
    section: Section;
};

export default function VideoSection({ section }: Props) {
    return (
        <section>
            <SectionTitle title={section.title} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/news/${article.id}`}
                        className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={article.imageUrl}
                                alt={article.imageAlt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Play icon overlay */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                    <svg
                                        className="w-5 h-5 text-[#c1121f] ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="p-3">
                            <h4 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#c1121f] transition line-clamp-2">
                                {article.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}