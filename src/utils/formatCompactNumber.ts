
export function formatCompactNumber(value: number): string {
    if (!Number.isFinite(value)) return "0";

    const abs = Math.abs(value);

    if (abs < 1_000) return String(value);

    const units = [
        { threshold: 1e12, suffix: "T" },
        { threshold: 1e9, suffix: "B" },
        { threshold: 1e6, suffix: "M" },
        { threshold: 1e3, suffix: "K" },
    ];

    const unit = units.find(({ threshold }) => abs >= threshold);

    if (!unit) return String(value);

    const formatted = value / unit.threshold;
    const digits = Math.abs(formatted) >= 100 ? 0 : 1;

    return `${Number(formatted.toFixed(digits))}${unit.suffix}`;
}
