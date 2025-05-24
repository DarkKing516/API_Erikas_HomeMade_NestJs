// src/roles/roles.service.ts
import { Injectable } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { TypeProductsEntity } from '../data/entities/product-types.entity';
import { TypeProductsCreateDto } from '../data/dto/create-product-type.dto';
import { TypeProductsUpdateDto } from '../data/dto/update-product-type.dto';

@Injectable()
export class TypeProductsService {
  private collection = firestore.collection('type_products');

  async getAllTypeProducts(): Promise<TypeProductsEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as TypeProductsEntity,
    );
  }

  async getTypeProductByName(typeProductsName: string): Promise<TypeProductsEntity | null> {
    const querySnapshot = await this.collection
      .where('name', '==', typeProductsName)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as TypeProductsEntity;
  }

  async createTypeProduct(createTypeProductDto: TypeProductsCreateDto): Promise<TypeProductsEntity | null> {
    const existingTypeProduct = await this.getTypeProductByName(createTypeProductDto.name);

    if (existingTypeProduct) {
        console.log("El tipo de producto ya existe");
        return null;
    }

    const newTypeProductRef = this.collection.doc();
    const newTypeProduct: TypeProductsEntity = {
      ...createTypeProductDto,
      id: newTypeProductRef.id,
      status: true,
    };

    await newTypeProductRef.set(newTypeProduct);
    return newTypeProduct;
  }

  async updateTypeProduct(updateData: Partial<TypeProductsUpdateDto>): Promise<TypeProductsEntity | null> {
    const TypeProductRef = this.collection.doc((updateData.id ?? ""));
    const TypeProductSnapshot = await TypeProductRef.get();

    if (!TypeProductSnapshot.exists) return null;

    await TypeProductRef.update(updateData);
    return { id: TypeProductRef.id, ...updateData } as TypeProductsEntity;
  }

  async deleteTypeProduct(deleteTypeProduct: string): Promise<boolean> {
    const typeProductRef = this.collection.doc(deleteTypeProduct);
    const typeProductSnapshot = await typeProductRef.get();

    if (!typeProductSnapshot.exists) return false;

    await typeProductRef.delete();
    return true;
  }
}

