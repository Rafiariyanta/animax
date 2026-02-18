# AniList GraphQL API Integration

## 📚 Overview

Animax telah terintegrasi dengan AniList API menggunakan GraphQL dan Apollo Client. AniList adalah API gratis terbuka untuk database anime dan manga.

## 🏗️ Architecture

### Files Created

1. **`lib/apollo-client.ts`** - Apollo Client configuration
   - HTTP connection ke AniList GraphQL endpoint
   - In-memory caching untuk performance
   - Error handling configuration

2. **`lib/anilist-queries.ts`** - GraphQL queries
   - `GET_TRENDING_ANIME` - Anime yang sedang trending
   - `GET_POPULAR_ANIME` - Anime paling populer
   - `GET_ANIME_BY_ID` - Detail anime spesifik
   - `SEARCH_ANIME` - Pencarian anime
   - `GET_AIRING_TODAY` - Anime yang airing hari ini
   - `GET_SEASONAL_ANIME` - Anime seasonal

3. **`lib/anilist-types.ts`** - TypeScript types
   - Type definitions untuk AniList API responses
   - Type safety untuk data anime

4. **`components/providers/ApolloProvider.tsx`** - Apollo Provider wrapper
   - Provides Apollo Client ke seluruh app
   - Client component untuk Next.js App Router

5. **`components/AnimeCard.tsx`** - Reusable anime card component
   - Display anime dengan cover image
   - Hover effects dengan rating dan format
   - Link ke detail page

## 🔧 Usage

### Server Components (Recommended)

Untuk Next.js App Router, gunakan server components:

```typescript
import { apolloClient } from '@/lib/apollo-client';
import { GET_TRENDING_ANIME } from '@/lib/anilist-queries';

async function getTrendingAnime() {
  const { data } = await apolloClient.query<AnimeResponse>({
    query: GET_TRENDING_ANIME,
    variables: { page: 1, perPage: 10 },
  });
  return data?.Page?.media || [];
}
```

### Client Components

Untuk interactive features, gunakan client components:

```typescript
'use client';

import { useSuspenseQuery } from '@apollo/client';
import { GET_TRENDING_ANIME } from '@/lib/anilist-queries';

function TrendingAnime() {
  const { data } = useSuspenseQuery(GET_TRENDING_ANIME, {
    variables: { page: 1, perPage: 10 },
  });

  return <div>{/* render anime */}</div>;
}
```

## 📊 Available Queries

### 1. Trending Anime
```graphql
query GetTrendingAnime($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: TRENDING_DESC) {
      id
      title { romaji, english, native }
      coverImage { large, color }
      # ... more fields
    }
  }
}
```

### 2. Popular Anime
```graphql
query GetPopularAnime($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      # ... same fields
    }
  }
}
```

### 3. Search Anime
```graphql
query SearchAnime($search: String, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(search: $search, type: ANIME) {
      # ... fields
    }
  }
}
```

### 4. Anime Detail
```graphql
query GetAnimeById($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title { romaji, english, native }
    description
    coverImage { large, extraLarge, color }
    bannerImage
    episodes
    status
    averageScore
    genres
    studios { nodes { name } }
    # ... more fields
  }
}
```

## 🎨 Features

- ✅ TypeScript type safety
- ✅ Server-side rendering support
- ✅ Caching dengan Apollo Client
- ✅ Error handling
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Loading states
- ✅ Follows design system

## 📝 Example Pages

### Homepage ([app/page.tsx](app/page.tsx))
- Menampilkan trending anime
- Menampilkan popular anime
- Hero section dengan CTA buttons
- Grid layout responsive

### Future Pages to Create:
1. `/anime/[id]` - Detail page anime
2. `/trending` - Halaman trending lengkap
3. `/popular` - Halaman popular lengkap
4. `/search` - Halaman pencarian
5. `/seasonal` - Halaman seasonal anime

## 🚀 Next Steps

1. **Buat detail page** untuk individual anime
2. **Implement pagination** untuk infinite scroll
3. **Add search functionality** dengan search bar
4. **Implement favorites/watchlist** dengan user authentication
5. **Add filtering** berdasarkan genre, season, year
6. **Optimize images** dengan Next.js Image component
7. **Add loading skeletons** untuk better UX
8. **Implement error boundaries** untuk error handling

## 📚 Resources

- [AniList GraphQL Documentation](https://anilist.gitbook.io/anilist-apiv2-overview/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Next.js App Router](https://nextjs.org/docs/app)

## 🐛 Troubleshooting

### Common Issues:

1. **CORS errors** - AniList API mendukung CORS untuk client-side requests
2. **Rate limiting** - AniList membatasi requests, implement caching
3. **Type errors** - Pastikan types di `anilist-types.ts` match API response
4. **Missing data** - Gunakan optional chaining (`data?.Page?.media`)

### Development Server:
```bash
pnpm run dev
```

App akan berjalan di `http://localhost:3000` (atau port lain jika 3000 sudah digunakan)
