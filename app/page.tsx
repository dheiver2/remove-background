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

            const data = await response.json();
            setProcessedImage(`data:image/png;base64,${data.image}`);
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao processar a imagem.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Remover Fundo da Imagem</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/*" required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Processando...' : 'Remover Fundo'}
                </button>
            </form>

            {processedImage && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Resultado:</h2>
                    <img src={processedImage} alt="Imagem processada" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
}
