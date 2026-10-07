import Link from "next/link";

type Category = {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
};

const NavLinks = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
        next: { revalidate: 3600 },
    });
    const data = await res.json();
    const categories: Category[] = data.data;

    // শুধু scrapable গুলো নাও, বাকি সব বাদ
    const scrapable = categories.filter((cat) => cat.scrapable);

    return (
        <ul className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 md:gap-6 overflow-x-auto">
            {/* Home — manually যোগ করা, সবসময় প্রথমে */}
            <li>
                <Link
                    href="/"
                    className="text-[13px] md:text-sm text-gray-800 hover:text-[#c1121f] font-medium whitespace-nowrap transition"
                >
                    হোম
                </Link>
            </li>

            {/* বাকি scrapable category গুলো */}
            {scrapable.map((cat) => (
                <li key={cat.slug}>
                    <Link
                        href={`/category/${cat.slug}`}
                        className="text-[13px] md:text-sm text-gray-800 hover:text-[#c1121f] font-medium whitespace-nowrap transition"
                    >
                        {cat.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;