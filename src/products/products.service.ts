import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async findAll() {
    const products = await this.prisma.product.findMany({
      select: {
        name: true,
        code: true,
        uuid: true,
        updatedAt: true,
      },
    });

    return products;
  }
  async findOne(uuid: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        uuid: uuid,
      },
      select: {
        name: true,
        code: true,
        uuid: true,
        updatedAt: true,
      },
    });

    if (!product)
      throw new NotFoundException(`Product with uuid ${uuid} not found`);

    return product;
  }

  async findByCode(code: string) {
    const product = await this.prisma.product.findMany({
      where: {
        code: code,
      },
      select: {
        name: true,
        code: true,
        uuid: true,
        updatedAt: true,
      },
    });

    if (!product)
      throw new NotFoundException(`Product with code ${code} not found`);

    return product;
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { uuid: uuid },
        data: updateProductDto,
      });

      return updatedProduct;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with uuid ${uuid} not found`);
      }
      throw error;
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
