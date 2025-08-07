import { Injectable } from '@nestjs/common';
import { bucket } from '../firebase/firebase-config';
import * as crypto from 'crypto';

@Injectable()
export class ImgService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${crypto.randomUUID()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => {
      throw new Error('Error cargando imagen en bucket: ' + err.message);
    });

    stream.on('finish', () => {
      console.log('✅ Imagen subida exitosamente');
    });

    stream.end(file.buffer);

    const [signedUrl] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '01-01-2100',
    });

    return signedUrl;
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const fileName = this.extractFileNameFromUrl(imageUrl);
    if (!fileName) return;

    const file = bucket.file(fileName);

    await file
      .delete()
      .then(() => console.log(`🗑 Imagen eliminada: ${fileName}`))
      .catch((err) =>
        console.error(
          `❌ Error eliminando imagen (${fileName}): ${err.message}`,
        ),
      );
  }

  async getAllImages(): Promise<string[]> {
    try {
      const [files] = await bucket.getFiles();
      const urls = await Promise.all(
        files.map(async (file) => {
          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '01-01-2100',
          });
          return url;
        }),
      );
      return urls;
    } catch (error) {
      console.error('❌ Error obteniendo imágenes:', error.message);
      return [];
    }
  }

  private extractFileNameFromUrl(url: string): string | null {
    const match = url.match(/\/([^\/?]+)\?/);
    return match ? match[1] : null;
  }
}
