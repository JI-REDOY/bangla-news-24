export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Top Row Skeleton — 3 column */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column (col-span-2) */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Top Section skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Hero skeleton */}
                        <div className="border border-gray-200 rounded-lg p-3">
                            <div className="aspect-[4/3] bg-gray-200 rounded animate-pulse" />
                            <div className="mt-3 space-y-2">
                                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                                <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse mt-3" />
                            </div>
                        </div>

                        {/* Headlines skeleton */}
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-lg p-3 space-y-2"
                                >
                                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section title skeleton */}
                    <div>
                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-5" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-lg p-3 space-y-2"
                                >
                                    <div className="aspect-[4/3] bg-gray-200 rounded animate-pulse" />
                                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column — Most Read skeleton */}
                <aside className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                <div key={i} className="p-4 flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}