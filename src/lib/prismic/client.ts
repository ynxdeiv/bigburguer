import { createClient } from "@/prismicio";

export const prismicClient = createClient();

export const getHomePage = () => {
  return prismicClient.getSingle("heroburguer");
};
