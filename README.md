# 🎬 ANIMAX

A modern, feature-rich anime discovery platform built with Next.js 16, featuring real-time search, dynamic filtering, and a sleek dark mode interface. Powered by the AniList GraphQL API.

![ANIMAX](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality

- **Real-time Search**: Instant anime search with smart debouncing and popover suggestions
- **Dynamic Filtering**: Filter anime by genre, year, and search queries with live updates
- **Responsive Design**: Fully responsive UI that works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Built-in theme toggle with system preference detection
- **Skeleton Loading**: Smooth loading states with animated skeleton screens

### 🎨 User Experience

- **Hero Carousel**: Featured anime carousel with banner images and overlays
- **Netflix-style Carousels**: Horizontal scrolling anime cards with smooth animations
- **Explore Page**: Advanced search with genre and year filters
- **Anime Detail Pages**: Comprehensive anime information including characters, staff, and trailers
- **Intuitive Navigation**: Clean header with search popover and quick navigation

### 🛠️ Technical Highlights

- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **GraphQL Integration**: Efficient data fetching from AniList API
- **Component Architecture**: Reusable components built with shadcn/ui
- **Type Safety**: Full TypeScript implementation for reliable code
- **Design System**: Consistent theming with CSS variables and Tailwind utilities

## 🚀 Tech Stack

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| **Next.js 16.1.6**      | React framework with App Router |
| **TypeScript 5.9**      | Type-safe JavaScript            |
| **Tailwind CSS 4.1**    | Utility-first CSS framework     |
| **shadcn/ui**           | High-quality React components   |
| **AniList GraphQL API** | Anime data source               |
| **next-themes**         | Dark mode support               |
| **Lucide React**        | Beautiful icon library          |

## 📦 Project Structure

```
animax/
├── app/                      # Next.js App Router pages
│   ├── anime/[id]/           # Anime detail page
│   ├── explore/              # Explore page with filters
│   ├── layout.tsx            # Root layout with header & footer
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── providers/            # Context providers
│   ├── AnimeCard.tsx         # Reusable anime card
│   ├── AnimeCarousel.tsx     # Horizontal carousel
│   ├── ExploreTabs.tsx       # Search & filter component
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   └── ThemeToggle.tsx       # Dark mode toggle
├── lib/                      # Utilities & configurations
│   ├── anilist-queries.ts    # GraphQL queries
│   ├── anilist-types.ts      # TypeScript types
│   └── apollo-client.ts      # GraphQL client
└── public/                   # Static assets
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18.17 or later
- pnpm, npm, yarn, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/animax.git
   cd animax
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

No environment variables required! The app uses public AniList GraphQL API.

**API Endpoints**: Update queries in `lib/anilist-queries.ts`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Designed & Developed by [Rafi](https://github.com/rafiariyata)**

---

<div align="center">
  <p>Built with ❤️ using Next.js and Tailwind CSS</p>
  <p>© 2025 ANIMAX. All rights reserved.</p>
</div>
