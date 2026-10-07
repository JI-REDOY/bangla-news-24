"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const EditProfilePage = () => {
    const router = useRouter();

    // Same method as profile page
    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log(user);

    // Form state
    const [name, setName] = useState(user?.name || "");
    const [imagePreview, setImagePreview] = useState(user?.image || "");
    const [imageBase64, setImageBase64] = useState("");
    const [loading, setLoading] = useState(false);

    // File → base64
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setImagePreview(base64);
            setImageBase64(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await authClient.updateUser({
            name: name,
            image: imageBase64 || user?.image || undefined,
        });

        setLoading(false);
        console.log(data, error);

        if (error) return;

        router.push("/profile");
        router.refresh();
    };

    if (!user) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10 text-center">
                <p className="text-gray-600">লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-10">

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-[#c1121f] transition">
                    হোম
                </Link>
                <span className="mx-2">/</span>
                <Link href="/profile" className="hover:text-[#c1121f] transition">
                    প্রোফাইল
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-800">এডিট</span>
            </nav>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    প্রোফাইল এডিট করুন
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    আপনার নাম এবং ছবি পরিবর্তন করুন
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Avatar + Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-3">
                            প্রোফাইল ছবি
                        </label>

                        <div className="flex items-center gap-5">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c1121f] to-[#a10e19] text-white flex items-center justify-center text-2xl font-bold">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="flex-1">
                                <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition">
                                    নতুন ছবি
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-2">
                                    JPG, PNG (max 1MB)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            নাম
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c1121f] focus:ring-1 focus:ring-[#c1121f] transition"
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1.5">
                            ইমেইল পরিবর্তন করা যায় না
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#c1121f] hover:bg-[#a10e19] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition"
                        >
                            {loading ? "সেভ হচ্ছে..." : "সেভ করুন"}
                        </button>
                        <Link
                            href="/profile"
                            className="flex-1 text-center border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 rounded-lg transition"
                        >
                            বাতিল
                        </Link>
                    </div>

                </form>
            </div>

        </main>
    );
};

export default EditProfilePage;