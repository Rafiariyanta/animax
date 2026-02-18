import { Anime } from '@/lib/anilist-types';
import Link from 'next/link';

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link href={`/anime/${anime.id}`} className="group block space-y-2 flex-shrink-0 w-[200px] md:w-[220px] lg:w-[240px]">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-border bg-muted">
        <img
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex items-center gap-2 text-white">
            <span className="text-sm font-medium">⭐ {anime.averageScore}</span>
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
    </Link>
  );
}
