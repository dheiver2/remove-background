import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
        }

        // Envia a imagem para o back-end em Flask
        const flaskResponse = await fetch('http://localhost:5000/remove-background', {
            method: 'POST',
            body: formData,
        });

        if (!flaskResponse.ok) {
            throw new Error('Erro ao processar a imagem no back-end');
        }

        const data = await flaskResponse.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro:', error);
        return NextResponse.json({ error: 'Ocorreu um erro ao processar a imagem' }, { status: 500 });
    }
}
