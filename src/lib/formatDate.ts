function getBanglaTimeOfDay(hour: number): string {
    if (hour >= 4 && hour < 6) return "ভোর";
    if (hour >= 6 && hour < 12) return "সকাল";
    if (hour >= 12 && hour < 15) return "দুপুর";
    if (hour >= 15 && hour < 18) return "বিকাল";
    if (hour >= 18 && hour < 20) return "সন্ধ্যা";
    return "রাত";
}

function toBanglaNumber(num: number): string {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
        .toString()
        .split("")
        .map((d) => banglaDigits[parseInt(d)] ?? d)
        .join("");
}

export function formatBanglaDate(iso: string | null): string {
    if (!iso) return "";

    const date = new Date(iso);

    // তারিখ
    const day = toBanglaNumber(date.getDate());
    const month = date.toLocaleDateString("bn-BD", { month: "long" });
    const year = toBanglaNumber(date.getFullYear());

    // সময়
    const hour24 = date.getHours();
    const minute = date.getMinutes();
    const timeOfDay = getBanglaTimeOfDay(hour24);

    // 12-hour format (০-১১)
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const hourBangla = toBanglaNumber(hour12);
    const minuteBangla = toBanglaNumber(minute).padStart(2, "০");

    return `${day} ${month}, ${year} ${timeOfDay} ${hourBangla}:${minuteBangla}`;
}