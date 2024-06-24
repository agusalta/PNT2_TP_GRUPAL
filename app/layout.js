import { League_Spartan } from '@next/font/google';
import { UserProvider } from './context/UserContext';
import { CocktailProvider } from './context/CocktailContext';
import './globals.css'; // Asegúrate de importar tus estilos globales

const leagueSpartan = League_Spartan({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Proyecto PNT2',
  description: 'Integrantes del grupo: Agustín Altamirano y Mauro Francisco Pavesi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <CocktailProvider>
          <body className={leagueSpartan.className}>
            {children}
          </body>
        </CocktailProvider>
      </UserProvider>
    </html>
  );
}
