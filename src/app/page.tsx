import AuctionPage from "@/components/auction-page";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]"></div>
      <AuctionPage />
    </main>
  );
}
