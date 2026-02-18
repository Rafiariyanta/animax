import { GET_RECOMMENDED_ANIME } from "@/lib/anilist-queries";
import { Anime } from "@/lib/anilist-types";
import ExploreClient from "@/components/ExploreClient";

async function getRecommendedAnime(): Promise<Anime[]> {
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: GET_RECOMMENDED_ANIME,
        variables: {
          page: 1,
          perPage: 20,
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const json = await response.json();
    return json.data.Page.media;
  } catch (error) {
    console.error("Error fetching recommended anime:", error);
    return [];
  }
}

export default async function ExplorePage() {
  const recommendedAnime = await getRecommendedAnime();

  return <ExploreClient recommendedAnime={recommendedAnime} />;
}
