"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { Anime } from "@/lib/anilist-types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroCarouselProps {
  anime: Anime[];
}

export default function HeroCarousel({ anime }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % anime.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [anime.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? anime.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % anime.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (anime.length === 0) return null;

  const currentAnime = anime[currentIndex];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentAnime.bannerImage || currentAnime.coverImage.extraLarge}
          alt={currentAnime.title.english || currentAnime.title.romaji}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {currentAnime.title.english || currentAnime.title.romaji}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-foreground">
                ⭐ {currentAnime.averageScore}%
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {currentAnime.format}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {currentAnime.episodes} Episodes
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {currentAnime.studios?.nodes?.map((s) => s.name).join(", ")}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {currentAnime.genres.slice(0, 5).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground line-clamp-3">
              {currentAnime.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button asChild size="default" className="gap-2">
                <Link href={`/anime/${currentAnime.id}`}>
                  <Play className="h-5 w-5" />
                  See Detail
                </Link>
              </Button>
              <Button variant="secondary" size="default" className="gap-2">
                <Plus className="h-5 w-5" />
                Add to List
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {anime.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
