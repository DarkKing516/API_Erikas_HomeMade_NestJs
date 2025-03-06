// src\data\firebse\FirebaseService.ts
import { Injectable } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';

@Injectable()
export class FirebaseService {
  async addDocument(): Promise<void> {
    const docRef = firestore.collection('usuarios').doc('usuario123');

    await docRef.set({
      nombre: 'Erika',
      email: 'erika@ejemplo.com',
      edad: 28,
    });

    console.log('Documento agregado');
  }
}
