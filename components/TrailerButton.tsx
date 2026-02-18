"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Anime } from "@/lib/anilist-types";

interface TrailerButtonProps {
  anime: Anime;
}

export default function TrailerButton({ anime }: TrailerButtonProps) {
  const handleWatchTrailer = () => {
    if (!anime.trailer) return;

    const trailerUrl =
      anime.trailer.site === "youtube"
        ? `https://www.youtube.com/watch?v=${anime.trailer.id}`
        : anime.trailer.site === "dailymotion"
          ? `https://www.dailymotion.com/video/${anime.trailer.id}`
          : null;

    if (trailerUrl) {
      window.open(trailerUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!anime.trailer) {
    return (
      <Button size="default" className="gap-2" disabled>
        <Play className="h-5 w-5" />
        Trailer Not Available
      </Button>
    );
  }

  return (
    <Button size="default" className="gap-2" onClick={handleWatchTrailer}>
      <Play className="h-5 w-5" />
      Watch Trailer
    </Button>
  );
}
