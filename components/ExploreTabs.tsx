"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { GET_GENRE_COLLECTION, SEARCH_ANIME } from "@/lib/anilist-queries";

interface ExploreTabsProps {
  recommendedAnime?: any[];
}

// Skeleton component for loading state
function AnimeCardSkeleton() {
  return (
    <div className="space-y-2">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="space-y-1">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
      </div>
    </div>
  );
}

export default function ExploreTabs({ recommendedAnime }: ExploreTabsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch genres from AniList on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: GET_GENRE_COLLECTION,
          }),
        });

        const json = await response.json();
        if (json.data?.GenreCollection) {
          setGenres(json.data.GenreCollection);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
        // Fallback to hardcoded genres if fetch fails
        setGenres([
          "Action", "Adventure", "Comedy", "Drama", "Fantasy",
          "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life",
          "Sports", "Supernatural", "Thriller"
        ]);
      }
    };

    fetchGenres();
  }, []);

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  // Check if user has any active filters
  const hasActiveFilters = searchQuery.length >= 3 || selectedGenre || selectedYear;

  // Search anime from AniList database
  useEffect(() => {
    const searchAnime = async () => {
      // Only search if we have valid filters
      const shouldSearch = searchQuery.length >= 3 || selectedGenre || selectedYear;

      if (!shouldSearch) {
        setSearchResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const variables: any = {
          page: 1,
          perPage: 20,
        };

        // Only add search parameter if we have 3+ characters
        if (searchQuery.length >= 3) {
          variables.search = searchQuery;
        }

        // Add genre filter
        if (selectedGenre) {
          variables.genre = selectedGenre;
        }

        // Add year filter
        if (selectedYear) {
          variables.year = parseInt(selectedYear);
        }

        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: SEARCH_ANIME,
            variables,
          }),
        });

        const json = await response.json();
        const results = json.data?.Page?.media || [];
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching anime:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(searchAnime, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedGenre, selectedYear]);

  return (
    <div className="w-full mt-8 space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card"
            />
          </div>
        </div>

        {/* Genre Select */}
        <div className="w-full md:w-48">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Year Select */}
        <div className="w-full md:w-48">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Results {searchResults.length > 0 && !isLoading && `(${searchResults.length})`}
          </h3>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 20 }).map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {searchResults.map((anime) => (
                <Link
                  key={anime.id}
                  href={`/anime/${anime.id}`}
                  className="group block"
                >
                  <div className="space-y-2">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border bg-card">
                      <img
                        src={anime.coverImage.large}
                        alt={anime.title.english || anime.title.romaji}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-sm font-medium">⭐ {anime.averageScore}%</span>
                          <span className="text-xs text-white/70">{anime.format}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {anime.title.english || anime.title.romaji}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {anime.genres.slice(0, 2).join(' • ')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No anime found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* All Recommendations Grid - Only show when no active filters */}
      {!hasActiveFilters && recommendedAnime && recommendedAnime.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">All Recommendations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedAnime.slice(0, 20).map((anime) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                className="group block"
              >
                <div className="space-y-2">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border bg-card">
                    <img
                      src={anime.coverImage.large}
                      alt={anime.title.english || anime.title.romaji}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-sm font-medium">⭐ {anime.averageScore}%</span>
                        <span className="text-xs text-white/70">{anime.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {anime.title.english || anime.title.romaji}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {anime.genres.slice(0, 2).join(' • ')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
