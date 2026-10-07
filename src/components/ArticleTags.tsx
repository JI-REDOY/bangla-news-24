type Props = {
    tags: string[];
};

export default function ArticleTags({ tags }: Props) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3">ট্যাগ:</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-default"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}