import Image from "next/image";
import { BodyBlock } from "@/types/news";

type Props = {
    blocks: BodyBlock[];
};

export default function ArticleBody({ blocks }: Props) {
    return (
        <div className="prose prose-lg max-w-none">
            {blocks.map((block, index) => {
                // Paragraph
                if (block.type === "text") {
                    return (
                        <p
                            key={index}
                            className="text-base md:text-lg text-gray-800 leading-relaxed mb-5"
                        >
                            {block.text}
                        </p>
                    );
                }

                // Subheading
                if (block.type === "subheading") {
                    return (
                        <h2
                            key={index}
                            className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4"
                        >
                            {block.text}
                        </h2>
                    );
                }

                // Image
                if (block.type === "image") {
                    return (
                        <figure key={index} className="my-6">
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                                <Image
                                    src={block.url}
                                    alt={block.altText}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 700px"
                                    className="object-cover"
                                />
                            </div>
                            {block.caption && (
                                <figcaption className="text-sm text-gray-600 mt-2 leading-snug">
                                    {block.caption}
                                    {block.copyrightHolder && (
                                        <span className="block text-xs text-gray-400 mt-1">
                                            ছবি: {block.copyrightHolder}
                                        </span>
                                    )}
                                </figcaption>
                            )}
                        </figure>
                    );
                }

                return null;
            })}
        </div>
    );
}