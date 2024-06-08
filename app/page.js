import PageCocktails from "./cocktails/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-customWhite p-4 text-black text-center font-bold text-5xl italic">
        COCKTAILS
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-customWhite text-black">
        <div className="w-full">
          <PageCocktails />
        </div>
      </main>
    </div>
  );
}
