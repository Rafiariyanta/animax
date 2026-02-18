import { notFound } from "next/navigation";
import { GET_ANIME_BY_ID } from "@/lib/anilist-queries";
import { Anime } from "@/lib/anilist-types";
import AnimeDetailTabs from "@/components/AnimeDetailTabs";
import TrailerButton from "@/components/TrailerButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

async function getAnimeDetails(id: string): Promise<Anime | null> {
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: GET_ANIME_BY_ID,
        variables: { id: parseInt(id) },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const json = await response.json();
    return json.data.Media;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return null;
  }
}

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const anime = await getAnimeDetails(id);

  if (!anime) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        {anime.bannerImage ? (
          <img
            src={anime.bannerImage}
            alt={anime.title.english || anime.title.romaji}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={anime.coverImage.extraLarge}
            alt={anime.title.english || anime.title.romaji}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative -mt-32 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <img
              src={anime.coverImage.extraLarge}
              alt={anime.title.english || anime.title.romaji}
              className="w-48 md:w-64 rounded-lg shadow-2xl"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                {anime.title.english || anime.title.romaji}
              </h1>
              {anime.title.romaji !== anime.title.english && (
                <p className="text-lg text-muted-foreground mt-1">
                  {anime.title.romaji}
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-foreground">
                ⭐ {anime.averageScore}%
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{anime.format}</span>
              {anime.episodes && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {anime.episodes} Episodes
                  </span>
                </>
              )}
              {anime.duration && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {anime.duration} min
                  </span>
                </>
              )}
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{anime.status}</span>
              {anime.studios?.nodes?.[0] && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {anime.studios.nodes[0].name}
                  </span>
                </>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div className="max-w-3xl">
              <p className="text-base text-muted-foreground leading-relaxed">
                {anime.description?.replace(/<[^>]*>/g, "") ||
                  "No description available."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <TrailerButton anime={anime} />
              <Button variant="secondary" size="default" className="gap-2">
                <Plus className="h-5 w-5" />
                Add to List
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section with Content */}
        <AnimeDetailTabs anime={anime} />
      </div>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const anime = await getAnimeDetails(id);

  if (!anime) {
    return {
      title: "Anime Not Found",
    };
  }

  return {
    title: `${anime.title.english || anime.title.romaji} - Animax`,
    description: anime.description?.replace(/<[^>]*>/g, "") || "",
  };
}
