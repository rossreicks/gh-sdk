export type PrRef = number | string;

export function formatPrRef(pr: PrRef): string {
    return String(pr);
}
