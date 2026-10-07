export default function CategoryLoading() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            {/* Section title skeleton */}
            <div className="border-b-2 border-gray-200 mb-5 pb-2">
                <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Count skeleton */}
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-6" />

            {/* Cards grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className="border border-gray-200 rounded-lg p-3 space-y-2"
                    >
                        <div className="aspect-[4/3] bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse mt-2" />
                    </div>
                ))}
            </div>
        </main>
    );
}