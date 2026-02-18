"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Anime } from "@/lib/anilist-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AnimeDetailTabsProps {
  anime: Anime;
}

const CHARACTERS_PER_PAGE = 10;

export default function AnimeDetailTabs({ anime }: AnimeDetailTabsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination for characters
  const totalPages = anime.characters?.edges
    ? Math.ceil(anime.characters.edges.length / CHARACTERS_PER_PAGE)
    : 0;
  const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
  const endIndex = startIndex + CHARACTERS_PER_PAGE;
  const currentCharacters = anime.characters?.edges?.slice(startIndex, endIndex) || [];

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Tabs defaultValue="episodes" className="w-full">
      <TabsList className="w-full justify-start rounded-none h-auto px-0 gap-6 bg-transparent border-b border-border">
        <TabsTrigger value="episodes" className="data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white data-[focus]:outline-none rounded-none px-0 py-3 border-b-2 border-transparent text-muted-foreground uppercase text-sm font-medium hover:text-foreground/80 focus-visible:outline-none transition-colors">
          Episodes
        </TabsTrigger>
        <TabsTrigger value="characters" className="data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white data-[focus]:outline-none rounded-none px-0 py-3 border-b-2 border-transparent text-muted-foreground uppercase text-sm font-medium hover:text-foreground/80 focus-visible:outline-none transition-colors">
          Characters
        </TabsTrigger>
        <TabsTrigger value="staff" className="data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white data-[focus]:outline-none rounded-none px-0 py-3 border-b-2 border-transparent text-muted-foreground uppercase text-sm font-medium hover:text-foreground/80 focus-visible:outline-none transition-colors">
          Staff
        </TabsTrigger>
      </TabsList>

      <TabsContent value="episodes" className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-foreground">Episodes</h2>

        {anime.streamingEpisodes && anime.streamingEpisodes.length > 0 ? (
          <div className="space-y-3">
            {anime.streamingEpisodes.map((episode, index) => (
              <a
                key={episode.url || index}
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-all cursor-pointer">
                  {episode.thumbnail && (
                    <div className="shrink-0 w-32 h-20 rounded overflow-hidden bg-muted">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title || `Episode ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {episode.title || `Episode ${index + 1}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Stream on official site
                    </p>
                  </div>
                  <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Streaming episodes not available</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="characters" className="space-y-4 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Characters</h2>
          {anime.characters?.edges && anime.characters.edges.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {startIndex + 1}-{Math.min(endIndex, anime.characters.edges.length)} of {anime.characters.edges.length}
            </span>
          )}
        </div>

        {anime.characters?.edges && anime.characters.edges.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentCharacters.map((characterEdge) => (
                <div key={characterEdge.node.id} className="group hover:scale-105 transition-all cursor-pointer">
                  <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-card">
                    <img
                      src={characterEdge.node.image.large}
                      alt={characterEdge.node.name.full}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-sm font-medium text-white truncate">
                        {characterEdge.node.name.full}
                      </p>
                      <p className="text-xs text-white/70 capitalize">
                        {characterEdge.role.replace(/_/g, " ")}
                      </p>
                      {characterEdge.voiceActors?.[0] && (
                        <p className="text-xs text-white/70 truncate">
                          {characterEdge.voiceActors[0].name.full}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(page)}
                      className="min-w-[2.5rem] h-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Character information not available</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="staff" className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-foreground">Staff</h2>

        {anime.staff?.edges && anime.staff.edges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {anime.staff.edges.map((staffEdge) => (
              <div key={staffEdge.node.id} className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-all cursor-pointer">
                {staffEdge.node.image && staffEdge.node.image.large && (
                  <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img
                      src={staffEdge.node.image.large}
                      alt={staffEdge.node.name.full}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {staffEdge.node.name.full}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize truncate">
                    {staffEdge.role.replace(/_/g, " ")}
                  </p>
                  {staffEdge.node.language && (
                    <p className="text-xs text-muted-foreground truncate">
                      {staffEdge.node.language}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Staff information not available</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
