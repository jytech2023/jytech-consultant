import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-lg font-bold tracking-tight">
            AI <span className="text-accent-light">Consultant</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="transition hover:text-foreground">
            Industries
          </Link>
          <Link
            href="/studies"
            className="transition hover:text-foreground"
          >
            Case Studies
          </Link>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-accent-light">
            Beta
          </span>
        </div>
      </div>
    </nav>
  );
}
