import { Inter } from "next/font/google";
import "./globals.css";
import { CocktailProvider } from "./context/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Proyecto PNT2",
  description: "Integrantes del grupo: Agustín Altamirano y Mauro Francisco Pavesi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CocktailProvider>
        <body className={inter.className}>{children}</body>
      </CocktailProvider>
    </html >
  );
}
