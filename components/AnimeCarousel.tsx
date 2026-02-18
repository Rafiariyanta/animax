"use client";

import { ReactNode, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AnimeCarouselProps {
  title: string;
  viewAllHref?: string;
  children: ReactNode;
}

export default function AnimeCarousel({
  title,
  viewAllHref,
  children,
}: AnimeCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View All →
            </a>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-start pl-2 hover:from-background/95"
              aria-label="Scroll left"
            >
              <div className="rounded-full bg-background/90 p-2 shadow-lg">
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </div>
            </button>
          )}

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {children}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-end pr-2 hover:from-background/95"
              aria-label="Scroll right"
            >
              <div className="rounded-full bg-background/90 p-2 shadow-lg">
                <ChevronRight className="h-5 w-5 text-foreground" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
