"use client";

import Link from "next/link";
import { Search, Bell, User } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navItems = [
    { name: "Home", href: "/", active: true },
    { name: "Explore", href: "/tv-shows", active: false },
    { name: "Community", href: "/movies", active: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              ANIMAX
            </h1>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  item.active
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Utility Icons */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="flex items-center gap-2">
            {isSearchOpen && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all"
                autoFocus
              />
            )}
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground focus:ring-2 focus:ring-ring"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Icon */}
          <button
            className="relative rounded-lg p-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground focus:ring-2 focus:ring-ring"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
          </button>

          {/* Profile Icon */}
          <button
            className="rounded-full p-1 text-muted-foreground transition-all hover:bg-accent hover:text-foreground focus:ring-2 focus:ring-ring"
            aria-label="Profile"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
