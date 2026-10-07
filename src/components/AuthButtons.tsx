"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";

const AuthButtons = () => {
    const router = useRouter();
    const toast = useToast();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        toast.info("লগআউট সফল", "আবার আসবেন!");

        // Delay দাও যাতে toast দেখা যায়
        setTimeout(() => {
            router.push("/");
            router.refresh();
        }, 800);
    };

    // Logged out
    if (!user) {
        return (
            <div className="hidden md:flex items-center gap-3 justify-end">
                <Link
                    href="/signin"
                    className="text-sm text-gray-800 hover:text-[#c1121f] font-medium transition"
                >
                    সাইন ইন
                </Link>
                <Link
                    href="/signup"
                    className="bg-[#c1121f] hover:bg-[#a10e19] text-white text-sm px-4 py-1.5 rounded-md transition shadow-sm"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    // Logged in
    return (
        <div className="hidden md:flex items-center gap-3 justify-end">

            {/* ✅ Avatar + Name → /profile link */}
            <Link
                href="/profile"
                className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-2 py-1 transition group"
                title="প্রোফাইল দেখুন"
            >
                {user.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="w-9 h-9 rounded-full object-cover border-2 border-[#c1121f]/20 group-hover:border-[#c1121f] transition"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c1121f] to-[#a10e19] text-white flex items-center justify-center text-sm font-bold">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
                <span className="text-sm font-medium text-gray-800 group-hover:text-[#c1121f] whitespace-nowrap max-w-[100px] truncate transition">
                    {user.name}
                </span>
            </Link>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-[#c1121f] whitespace-nowrap transition"
            >
                লগআউট
            </button>
        </div>
    );
};

export default AuthButtons;