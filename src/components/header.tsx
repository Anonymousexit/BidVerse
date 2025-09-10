import { Gavel } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Gavel className="text-primary-foreground h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold text-foreground font-headline">
          Bid<span className="text-primary">Verse</span>
        </h1>
      </div>
      <p className="text-muted-foreground hidden md:block backdrop-blur-sm">The future of online auctions.</p>
    </header>
  );
}
