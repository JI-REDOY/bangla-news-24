"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";

const SignUpPage = () => {
    const router = useRouter();
    const toast = useToast();

    // State
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [imageBase64, setImageBase64] = useState("");

    // File → base64
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024) {
            setError("ছবি ১ মেগাবাইটের ছোট হতে হবে");
            toast.warning("ছবি বড়", "১ মেগাবাইটের ছোট ছবি দিন");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setImagePreview(base64);
            setImageBase64(base64);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
        };

        // === Sign up (MongoDB-তে save) ===
        const { data, error } = await authClient.signUp.email({
            name: values.name,
            email: values.email,
            password: values.password,
            image: imageBase64 || undefined,
        });

        setLoading(false);

        if (error) {
            setError(error.message || "সাইন আপ ব্যর্থ হয়েছে");
            toast.error("সাইন আপ ব্যর্থ", error.message || "আবার চেষ্টা করুন");
            return;
        }

        if (data?.user) {
            toast.success("সাইন আপ সফল!", `স্বাগতম, ${data.user.name}`);
            setTimeout(() => {
                router.push("/");
                router.refresh();
            }, 800);
        } else {
            setError("সাইন আপ সম্পন্ন হয়নি, আবার চেষ্টা করুন");
            toast.warning("কিছু ভুল হয়েছে", "আবার চেষ্টা করুন");
        }
    };

    return (
        <div className="flex items-start justify-center px-4 py-10 bg-white">
            <div className="w-full max-w-md">

                <h1 className="text-3xl md:text-4xl font-bold text-[#c1121f] text-center mb-8">
                    সাইন আপ
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                        {error}
                    </div>
                )}

                {/* ===== Email/Password Form ===== */}
                <form onSubmit={onSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#c1121f] focus:ring-1 focus:ring-[#c1121f] transition"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            প্রোফাইল ছবি
                        </label>

                        {imagePreview ? (
                            <div className="flex items-center gap-3 mb-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview("");
                                        setImageBase64("");
                                    }}
                                    className="text-xs text-red-600 hover:underline"
                                >
                                    মুছে ফেলুন
                                </button>
                            </div>
                        ) : (
                            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[#c1121f] transition">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        📷 ছবি আপলোড করতে ক্লিক করুন
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        JPG, PNG (max 1MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            ইমেইল
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#c1121f] focus:ring-1 focus:ring-[#c1121f] transition pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600">
                                ✉
                            </span>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#c1121f] focus:ring-1 focus:ring-[#c1121f] transition"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#c1121f] hover:bg-[#a10e19] disabled:bg-gray-400 text-white font-medium py-3 rounded transition"
                    >
                        {loading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
                    </button>
                </form>

                {/* ===== Divider ===== */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-gray-500">অথবা</span>
                    </div>
                </div>

                {/* ===== Google Sign Up ===== */}
                <button
                    type="button"
                    onClick={async () => {
                        const data = await authClient.signIn.social({
                            provider: "google",
                        });
                        console.log(data);
                    }}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-3 hover:bg-gray-50 hover:border-gray-400 transition"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                        Google দিয়ে সাইন আপ করুন
                    </span>
                </button>

                {/* ===== GitHub Sign Up ===== */}
                <button
                    type="button"
                    onClick={async () => {
                        const data = await authClient.signIn.social({
                            provider: "github",
                        });
                        console.log(data);
                    }}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-3 hover:bg-gray-50 hover:border-gray-400 transition mt-3"
                >
                    <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                        GitHub দিয়ে সাইন আপ করুন
                    </span>
                </button>

                {/* ===== Sign In Link ===== */}
                <p className="text-center mt-6 text-sm text-gray-700">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="text-[#c1121f] font-medium hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignUpPage;