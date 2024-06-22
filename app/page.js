import PageCocktails from "./cocktails/page";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-customWhite text-black">
        <PageCocktails />
      </main>
    </div>
  );
}
