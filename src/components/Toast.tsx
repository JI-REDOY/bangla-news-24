"use client";

import { useEffect, useState } from "react";
import { Toast as ToastType } from "@/context/ToastContext";

type Props = {
    toast: ToastType;
    onClose: (id: string) => void;
};

// Icon
const ICONS = {
    success: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    warning: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01" />
        </svg>
    ),
    info: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01" />
        </svg>
    ),
};

// Color theme
const STYLES = {
    success: {
        accent: "bg-emerald-500",
        icon: "bg-emerald-500",
        title: "text-emerald-900",
        progress: "bg-emerald-500",
    },
    error: {
        accent: "bg-[#c1121f]",
        icon: "bg-[#c1121f]",
        title: "text-[#c1121f]",
        progress: "bg-[#c1121f]",
    },
    warning: {
        accent: "bg-amber-500",
        icon: "bg-amber-500",
        title: "text-amber-900",
        progress: "bg-amber-500",
    },
    info: {
        accent: "bg-slate-700",
        icon: "bg-slate-700",
        title: "text-slate-900",
        progress: "bg-slate-700",
    },
};

export default function Toast({ toast, onClose }: Props) {
    const s = STYLES[toast.type];
    const duration = toast.duration ?? 3500;
    const [progress, setProgress] = useState(100);

    // Progress bar animation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev - 100 / (duration / 50);
                return next <= 0 ? 0 : next;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [duration]);

    return (
        <div className="animate-slide-in-right pointer-events-auto">
            <div className="relative bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden min-w-[320px] max-w-[400px]">

                {/* Left accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.accent}`} />

                <div className="flex items-start gap-3 p-4 pl-5">

                    {/* Icon circle */}
                    <div className={`${s.icon} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-sm`}>
                        {ICONS[toast.type]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-1">
                        <p className={`font-semibold text-sm leading-snug ${s.title}`}>
                            {toast.title}
                        </p>
                        {toast.message && (
                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {toast.message}
                            </p>
                        )}
                    </div>

                    {/* Close */}
                    <button
                        onClick={() => onClose(toast.id)}
                        className="text-gray-300 hover:text-gray-600 transition flex-shrink-0 -mt-0.5"
                        aria-label="Close"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Progress bar */}
                <div className="h-0.5 bg-gray-100 relative overflow-hidden">
                    <div
                        className={`h-full ${s.progress} transition-all duration-50 ease-linear`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}