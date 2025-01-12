import { NextResponse } from 'next/server';
import { BackgroundRemoval } from '@imgly/background-removal';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const inputImage = new Blob([buffer], { type: file.type });

    // Remove o fundo da imagem
    const outputImage = await BackgroundRemoval.removeBackground(inputImage);

    // Converte a imagem processada para base64
    const outputBuffer = await outputImage.arrayBuffer();
    const base64Image = Buffer.from(outputBuffer).toString('base64');

    return NextResponse.json({ image: base64Image });
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Ocorreu um erro ao processar a imagem' }, { status: 500 });
  }
}
