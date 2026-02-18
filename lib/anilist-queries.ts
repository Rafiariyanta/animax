// GraphQL queries as strings for fetch API

// Trending anime query
export const GET_TRENDING_ANIME = `
  query GetTrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          extraLarge
          color
        }
        bannerImage
        episodes
        status
        averageScore
        genres
        studios {
          nodes {
            name
          }
        }
        season
        seasonYear
        format
      }
    }
  }
`;

// Popular anime query
export const GET_POPULAR_ANIME = `
  query GetPopularAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          extraLarge
          color
        }
        bannerImage
        episodes
        status
        averageScore
        genres
        studios {
          nodes {
            name
          }
        }
        season
        seasonYear
        format
      }
    }
  }
`;

// Anime by ID
export const GET_ANIME_BY_ID = `
  query GetAnimeById($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        large
        extraLarge
        color
      }
      bannerImage
      episodes
      status
      averageScore
      genres
      studios {
        nodes {
          name
        }
      }
      season
      seasonYear
      format
      duration
      source
      rankings {
        rank
        type
        format
        year
        season
        allTime
        context
      }
      trailer {
        id
        site
      }
      streamingEpisodes {
        title
        thumbnail
        url
      }
      characters {
        edges {
          node {
            id
            name {
              full
              native
            }
            image {
              large
              medium
            }
          }
          role
          voiceActors {
            id
            name {
              full
              native
            }
            image {
              large
              medium
            }
            language
          }
        }
      }
      staff {
        edges {
          node {
            id
            name {
              full
              native
            }
            image {
              large
              medium
            }
            language
          }
          role
        }
      }
    }
  }
`;

// Search anime with filters
export const SEARCH_ANIME = `
  query SearchAnime($search: String, $genre: String, $year: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: ANIME, genre: $genre, seasonYear: $year, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          extraLarge
          color
        }
        bannerImage
        episodes
        status
        averageScore
        genres
        seasonYear
        format
      }
    }
  }
`;

// Airing today
export const GET_AIRING_TODAY = `
  query GetAiringToday {
    Page(page: 1, perPage: 20) {
      media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          extraLarge
          color
        }
        episodes
        status
        averageScore
        genres
        format
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
`;

// Seasonal anime
export const GET_SEASONAL_ANIME = `
  query GetSeasonalAnime($season: MediaSeason, $year: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(season: $season, seasonYear: $year, type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          extraLarge
          color
        }
        bannerImage
        episodes
        status
        averageScore
        genres
        studios {
          nodes {
            name
          }
        }
        season
        seasonYear
        format
      }
    }
  }
`;

// Recommended anime - Get highly rated anime from various genres
export const GET_RECOMMENDED_ANIME = `
  query GetRecommendedAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: SCORE_DESC, averageScore_greater: 80) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          extraLarge
          color
        }
        bannerImage
        episodes
        status
        averageScore
        genres
        studios {
          nodes {
            name
          }
        }
        season
        seasonYear
        format
      }
    }
  }
`;

// Genre collection - Get all available genres
export const GET_GENRE_COLLECTION = `
  query GetGenreCollection {
    GenreCollection
  }
`;
