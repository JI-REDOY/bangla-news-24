export default function ProfileLoading() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            {/* Hero card skeleton */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg mb-8 animate-pulse">
                <div className="px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center md:items-end gap-6">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-300 flex-shrink-0" />
                    <div className="flex-1 space-y-3 text-center md:text-left">
                        <div className="h-7 w-48 bg-gray-300 rounded mx-auto md:mx-0" />
                        <div className="h-4 w-64 bg-gray-300 rounded mx-auto md:mx-0" />
                    </div>
                    <div className="h-10 w-32 bg-gray-300 rounded-lg" />
                </div>
            </div>

            {/* Info grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-xl p-5 space-y-2"
                    >
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                ))}
            </div>

            {/* Quick actions skeleton */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg"
                        >
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}