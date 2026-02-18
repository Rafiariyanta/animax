export interface AnimeTitle {
  romaji: string;
  english: string | null;
  native: string;
}

export interface CoverImage {
  large: string;
  extraLarge: string;
  color: string | null;
}

export interface StudioNode {
  name: string;
}

export interface Studios {
  nodes: StudioNode[];
}

export interface NextAiringEpisode {
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
}

export interface Trailer {
  id: string;
  site: string;
}

export interface StreamingEpisode {
  title: string;
  thumbnail: string;
  url: string;
}

export interface Ranking {
  rank: number;
  type: string;
  format: string;
  year: number;
  season: string;
  allTime: boolean;
  context: string;
}

export interface Anime {
  id: number;
  title: AnimeTitle;
  description: string | null;
  coverImage: CoverImage;
  bannerImage: string | null;
  episodes: number | null;
  status: string;
  averageScore: number;
  genres: string[];
  studios: Studios;
  season: string | null;
  seasonYear: number | null;
  format: string;
  duration: number | null;
  source: string | null;
  rankings: Ranking[];
  trailer: Trailer | null;
  streamingEpisodes: StreamingEpisode[];
  nextAiringEpisode: NextAiringEpisode | null;
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface AnimeResponse {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
}

export interface AnimeDetailResponse {
  Media: Anime;
}
