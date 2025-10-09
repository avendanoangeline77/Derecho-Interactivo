import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

import path from 'path';



export async function POST(req: Request) {

  const formData = await req.formData();

  const file = formData.get('file') as File;
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;


  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }


  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // Ruta donde se guardará el archivo
    const filePath = path.join(process.cwd(), 'public', 'upload', 'proyectos', author);

    if (!existsSync(filePath)) {

      await mkdir(filePath, { recursive: true });

    }



    
    await writeFile(path.join(filePath, title + ".md"), buffer);

    return NextResponse.json({ success: true,  });


  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file.' }, { status: 500 });
  }



}