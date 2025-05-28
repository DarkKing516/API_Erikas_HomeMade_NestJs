// src/roles/roles.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/lib/firebase/firebase-config';
import { TypeProductsEntity } from '../data/entities/product-types.entity';
import { TypeProductsCreateDto } from '../data/dto/create-product-type.dto';
import { TypeProductsUpdateDto } from '../data/dto/update-product-type.dto';
import { ProductTypeConverter } from '../../../lib/firebase/converters/product/product-type-converter';

@Injectable()
export class TypeProductsService {
  private collection = firestore.collection('type_products').withConverter(ProductTypeConverter);

  async getAllTypeProducts(): Promise<TypeProductsEntity[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async getTypeProductByName(typeProductsName: string): Promise<TypeProductsEntity | null> {
    const querySnapshot = await this.collection.where('name', '==', typeProductsName).limit(1).get();

    if (querySnapshot.empty) return null;

    return querySnapshot.docs[0].data();
  }

  async createTypeProduct(createTypeProductDto: TypeProductsCreateDto): Promise<TypeProductsEntity> {
    const existingTypeProduct = await this.getTypeProductByName(createTypeProductDto.name);

    if (existingTypeProduct) throw new ConflictException('El tipo de producto ya existe');

    const newTypeProductRef = this.collection.doc();
    const newTypeProduct: TypeProductsEntity = {
      ...createTypeProductDto,
      id      : newTypeProductRef.id,
      created : new Date(),
      status  : true,
    };

    await newTypeProductRef.set(newTypeProduct);
    return newTypeProduct;
  }

  async updateTypeProduct(updateData: TypeProductsUpdateDto): Promise<TypeProductsEntity> {
    if (!updateData.id) throw new NotFoundException('ID del tipo de producto requerido');

    const typeProductRef = this.collection.doc(updateData.id);
    const typeProductSnapshot = await typeProductRef.get();

    if (!typeProductSnapshot.exists) throw new NotFoundException('Tipo de producto no encontrado');

    const { id, ...dataToUpdate } = updateData;
    await typeProductRef.update(dataToUpdate);

    const updatedSnapshot = await typeProductRef.get();
    const updatedData = updatedSnapshot.data();
    if (!updatedData) throw new NotFoundException('Error al recuperar el Tipo de producto actualizado');

    return updatedData;
  }

  async deleteTypeProduct(id: string): Promise<boolean> {
    const typeProductRef = this.collection.doc(id);
    const typeProductSnapshot = await typeProductRef.get();

    if (!typeProductSnapshot.exists) throw new NotFoundException('Tipo de producto no encontrado');

    await typeProductRef.delete();
    return true;
  }
}

