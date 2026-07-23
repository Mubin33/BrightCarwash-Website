import { PublicHeroData } from "@/types/hero-public";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchPublicHeroSection(): Promise<PublicHeroData | null> {
    try {
        const res = await fetch(`${API_BASE}/api/application/pages/home_hero`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data?.content || null;
    } catch {
        return null;
    }
}