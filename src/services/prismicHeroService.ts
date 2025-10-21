import { prismicClient } from "@/lib/prismic/client";

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  primaryButtonText: string;
  secondaryButtonText: string;
}

export class PrismicHeroService {
  static async getHeroData(): Promise<HeroData> {
    try {
      const response = await prismicClient.getSingle("heroburguer");

      if (!response || !response.data) {
        return this.getDefaultHeroData();
      }

      const data = response.data;

      return {
        title: data.textoprincipalhero || "BIG BURGUER",
        subtitle: data.textosecudariohero || "Os Melhores Hambúrgueres",
        description: "",
        image: {
          url: data.imagemhero?.url ?? "",
          alt: data.imagemhero?.alt ?? "",
        },
        primaryButtonText: "Peça Agora",
        secondaryButtonText: "Ver Cardápio",
      };
    } catch (error) {
      return this.getDefaultHeroData();
    }
  }

  private static getDefaultHeroData(): HeroData {
    return {
      title: "BIG BURGUER",
      subtitle: "Os Melhores Hambúrgueres",
      description: "",
      image: {
        url: "",
        alt: "",
      },
      primaryButtonText: "Peça Agora",
      secondaryButtonText: "Ver Cardápio",
    };
  }

  static useHeroData() {
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchHeroData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await this.getHeroData();
          setHeroData(data);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Erro ao carregar dados"
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchHeroData();
    }, []);

    return { heroData, isLoading, error };
  }
}
import { useState, useEffect } from "react";
