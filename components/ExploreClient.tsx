"use client";

import Link from "next/link";
import ExploreTabs from "./ExploreTabs";

interface ExploreClientProps {
  recommendedAnime: any[];
}

export default function ExploreClient({ recommendedAnime }: ExploreClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Featured Section - 2 Cards (1 normal, 1 wider) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* First Card - Normal Size */}
          {recommendedAnime[0] && (
            <Link
              key={recommendedAnime[0].id}
              href={`/anime/${recommendedAnime[0].id}`}
              className="group block md:col-span-1"
            >
              <div className="relative h-64 rounded-lg overflow-hidden bg-card cursor-pointer">
                {/* Background Banner Image */}
                {recommendedAnime[0].bannerImage ? (
                  <img
                    src={recommendedAnime[0].bannerImage}
                    alt={
                      recommendedAnime[0].title.english ||
                      recommendedAnime[0].title.romaji
                    }
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={recommendedAnime[0].coverImage.extraLarge}
                    alt={
                      recommendedAnime[0].title.english ||
                      recommendedAnime[0].title.romaji
                    }
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {recommendedAnime[0].title.english ||
                      recommendedAnime[0].title.romaji}
                  </h2>

                  <div className="flex items-center gap-3 text-sm text-white/80 mb-3">
                    <span className="flex items-center gap-1">
                      ⭐ {recommendedAnime[0].averageScore}%
                    </span>
                    <span>•</span>
                    <span>{recommendedAnime[0].format}</span>
                    {recommendedAnime[0].episodes && (
                      <>
                        <span>•</span>
                        <span>{recommendedAnime[0].episodes} eps</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Second Card - 1.5x Wider (spans 2 columns) */}
          {recommendedAnime[1] && (
            <Link
              key={recommendedAnime[1].id}
              href={`/anime/${recommendedAnime[1].id}`}
              className="group block md:col-span-2"
            >
              <div className="relative h-64 rounded-lg overflow-hidden bg-card cursor-pointer">
                {/* Background Banner Image */}
                {recommendedAnime[1].bannerImage ? (
                  <img
                    src={recommendedAnime[1].bannerImage}
                    alt={
                      recommendedAnime[1].title.english ||
                      recommendedAnime[1].title.romaji
                    }
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={recommendedAnime[1].coverImage.extraLarge}
                    alt={
                      recommendedAnime[1].title.english ||
                      recommendedAnime[1].title.romaji
                    }
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {recommendedAnime[1].title.english ||
                      recommendedAnime[1].title.romaji}
                  </h2>

                  <div className="flex items-center gap-3 text-sm text-white/80 mb-3">
                    <span className="flex items-center gap-1">
                      ⭐ {recommendedAnime[1].averageScore}%
                    </span>
                    <span>•</span>
                    <span>{recommendedAnime[1].format}</span>
                    {recommendedAnime[1].episodes && (
                      <>
                        <span>•</span>
                        <span>{recommendedAnime[1].episodes} eps</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <ExploreTabs recommendedAnime={recommendedAnime} />
      </div>
    </div>
  );
}
