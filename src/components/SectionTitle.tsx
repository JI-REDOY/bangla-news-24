type Props = {
    title: string;
};

export default function SectionTitle({ title }: Props) {
    return (
        <div className="border-b-2 border-[#c1121f] mb-5">
            <h2 className="inline-block text-xl md:text-2xl font-bold text-gray-900 pb-2">
                {title}
            </h2>
        </div>
    );
}