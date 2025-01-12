'use client'; // Marca o componente como Client Component

import { useState } from 'react';

export default function Home() {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const file = formData.get('image') as File;

    if (!file) {
      alert('Por favor, selecione uma imagem.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao processar a imagem');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao processar a imagem.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Remover Fundo da Imagem</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processando...' : 'Remover Fundo'}
        </button>
      </form>

      {processedImage && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Resultado:</h2>
          <img src={processedImage} alt="Imagem processada" className="max-w-full" />
        </div>
      )}
    </div>
  );
}
