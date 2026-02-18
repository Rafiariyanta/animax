import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-primary">
                ANIMAX
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for anime discovery
            </p>
          </div>

          {/* Right Section - Trademark */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
                ANIMAX
              </Link>
              . All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Designed & Developed by{" "}
              <span className="font-semibold text-primary">Rafi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
