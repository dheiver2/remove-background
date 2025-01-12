import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Configuração da fonte Inter
const inter = Inter({ subsets: ['latin'] });

// Metadados da aplicação (opcional)
export const metadata: Metadata = {
  title: 'Background Remover Tool',
  description: 'Uma ferramenta online para remover o fundo de imagens.',
};

// Layout raiz
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
