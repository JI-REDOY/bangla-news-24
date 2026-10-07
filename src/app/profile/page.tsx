"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log(user);

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <p className="text-gray-600">লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-4 py-10">

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-[#c1121f] transition">
                    হোম
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-800">আমার প্রোফাইল</span>
            </nav>

            {/* Hero Card */}
            <div className="relative bg-gradient-to-br from-[#c1121f] to-[#8b0a15] rounded-2xl overflow-hidden shadow-lg mb-8">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-12 -mb-12" />

                <div className="relative px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center md:items-end gap-6">
                    <div className="relative">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
                            />
                        ) : (
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white text-[#c1121f] flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-white/40 shadow-xl">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left text-white">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            {user.name || "নাম নেই"}
                        </h1>
                        <p className="text-sm text-white/80 mt-1">
                            {user.email}
                        </p>
                        {user.emailVerified && (
                            <span className="inline-flex items-center gap-1.5 text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full mt-2">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                ভেরিফাইড
                            </span>
                        )}
                    </div>

                    <Link
                        href="/profile/edit"
                        className="bg-white text-[#c1121f] hover:bg-gray-100 text-sm font-semibold px-5 py-2.5 rounded-lg transition flex items-center gap-2 shadow-md"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        এডিট করুন
                    </Link>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#c1121f] mb-2">
                        ইউজার আইডি
                    </p>
                    <p className="text-sm text-gray-800 font-mono break-all">
                        {user.id}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#c1121f] mb-2">
                        যোগদানের তারিখ
                    </p>
                    <p className="text-sm text-gray-800">
                        {formatBanglaDate(user.createdAt)}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#c1121f] mb-2">
                        সর্বশেষ আপডেট
                    </p>
                    <p className="text-sm text-gray-800">
                        {formatBanglaDate(user.updatedAt)}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#c1121f] mb-2">
                        অ্যাকাউন্ট স্ট্যাটাস
                    </p>
                    <p className="text-sm text-gray-800">
                        {user.emailVerified ? "ভেরিফাইড" : "আনভেরিফাইড"}
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    দ্রুত কাজ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#c1121f] hover:bg-gray-50 transition"
                    >
                        <span className="text-2xl">🏠</span>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#c1121f] transition">
                                হোমপেজ
                            </p>
                            <p className="text-xs text-gray-500">সব খবর দেখুন</p>
                        </div>
                    </Link>

                    <Link
                        href="/profile/edit"
                        className="group flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#c1121f] hover:bg-gray-50 transition"
                    >
                        <span className="text-2xl">✏️</span>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#c1121f] transition">
                                এডিট
                            </p>
                            <p className="text-xs text-gray-500">তথ্য পরিবর্তন</p>
                        </div>
                    </Link>

                    <Link
                        href="/settings"
                        className="group flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#c1121f] hover:bg-gray-50 transition"
                    >
                        <span className="text-2xl">⚙️</span>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#c1121f] transition">
                                সেটিংস
                            </p>
                            <p className="text-xs text-gray-500">নিরাপত্তা</p>
                        </div>
                    </Link>
                </div>
            </div>

        </main>
    );
};

function formatBanglaDate(iso: string | Date) {
    const date = new Date(iso);
    return date.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default ProfilePage;