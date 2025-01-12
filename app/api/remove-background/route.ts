import { NextResponse } from 'next/server';
import { remove } from 'rembg-node';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const inputImage = Buffer.from(buffer);

    const outputImage = await remove(inputImage);

    return new NextResponse(outputImage, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Ocorreu um erro ao processar a imagem' }, { status: 500 });
  }
}
