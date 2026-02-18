import { GET_TRENDING_ANIME, GET_POPULAR_ANIME, GET_RECOMMENDED_ANIME } from '@/lib/anilist-queries';
import { Anime, AnimeResponse } from '@/lib/anilist-types';
import AnimeCard from '@/components/AnimeCard';
import AnimeCarousel from '@/components/AnimeCarousel';
import HeroCarousel from '@/components/HeroCarousel';
import { fetchGraphQL } from '@/lib/apollo-client';

async function getTrendingAnime(): Promise<Anime[]> {
  const data = await fetchGraphQL<AnimeResponse>(
    GET_TRENDING_ANIME,
    { page: 1, perPage: 10 }
  );
  return data?.Page?.media || [];
}

async function getPopularAnime(): Promise<Anime[]> {
  const data = await fetchGraphQL<AnimeResponse>(
    GET_POPULAR_ANIME,
    { page: 1, perPage: 10 }
  );
  return data?.Page?.media || [];
}

async function getRecommendedAnime(): Promise<Anime[]> {
  const data = await fetchGraphQL<AnimeResponse>(
    GET_RECOMMENDED_ANIME,
    {}
  );
  return data?.Page?.media || [];
}

export default async function HomePage() {
  const [trendingAnime, popularAnime, recommendedAnime] = await Promise.all([
    getTrendingAnime(),
    getPopularAnime(),
    getRecommendedAnime(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel with Recommended Anime */}
      <HeroCarousel anime={recommendedAnime} />

      {/* Trending Anime Section */}
      <AnimeCarousel title="Trending Now" viewAllHref="/trending">
        {trendingAnime.map((anime: Anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </AnimeCarousel>

      {/* Popular Anime Section */}
      <div className="bg-muted/30">
        <AnimeCarousel title="Popular Anime" viewAllHref="/popular">
          {popularAnime.map((anime: Anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </AnimeCarousel>
      </div>
    </div>
  );
}
