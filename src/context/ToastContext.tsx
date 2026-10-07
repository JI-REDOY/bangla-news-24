"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
};

type ToastContextType = {
    toasts: Toast[];
    showToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (toast: Omit<Toast, "id">) => {
            const id = Math.random().toString(36).substring(2, 9);
            setToasts((prev) => [...prev, { ...toast, id }]);

            const duration = toast.duration ?? 3500;
            setTimeout(() => removeToast(id), duration);
        },
        [removeToast]
    );

    const success = useCallback(
        (title: string, message?: string) =>
            showToast({ type: "success", title, message }),
        [showToast]
    );

    const error = useCallback(
        (title: string, message?: string) =>
            showToast({ type: "error", title, message }),
        [showToast]
    );

    const warning = useCallback(
        (title: string, message?: string) =>
            showToast({ type: "warning", title, message }),
        [showToast]
    );

    const info = useCallback(
        (title: string, message?: string) =>
            showToast({ type: "info", title, message }),
        [showToast]
    );

    return (
        <ToastContext.Provider
            value={{ toasts, showToast, removeToast, success, error, warning, info }}
        >
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
}