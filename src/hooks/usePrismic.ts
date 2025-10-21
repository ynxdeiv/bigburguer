"use client";

import { useQuery } from "@tanstack/react-query";
import { PrismicHeroService, HeroData } from "@/services/prismicHeroService";

export const prismicQueryKeys = {
  all: ["prismic"] as const,
  hero: () => [...prismicQueryKeys.all, "hero"] as const,
};

export function useHeroData() {
  return useQuery({
    queryKey: prismicQueryKeys.hero(),
    queryFn: async () => {
      const data = await PrismicHeroService.getHeroData();
      return data;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
