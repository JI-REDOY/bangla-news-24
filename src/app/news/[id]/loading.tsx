export default function ArticleLoading() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-8">
            {/* Category + Title skeleton */}
            <div className="mb-8 space-y-3">
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />

                {/* Byline skeleton */}
                <div className="flex items-center gap-3 mt-4 pb-4 border-b border-gray-200">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Hero image skeleton */}
                <div className="aspect-video bg-gray-200 rounded-lg animate-pulse mt-6" />
            </div>

            {/* Body skeleton */}
            <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </main>
    );
}