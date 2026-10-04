import { PublicHeroData } from "@/types/hero-public";

import { api } from "@/lib/http";

export async function fetchPublicHeroSection(): Promise<PublicHeroData | null> {
    try {
        const { data: json } = await api.get("/application/pages/home_hero");
        return json.data?.content || null;
    } catch {
        return null;
    }
}