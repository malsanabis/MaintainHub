import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let prismaService: PrismaService;

  const mockProducts = {
    data: [
      {
        name: 'Product 1',
        code: 'P001',
        uuid: 'uuid1',
        updatedAt: new Date(),
      },
      {
        name: 'Product 2',
        code: 'P002',
        uuid: 'uuid2',
        updatedAt: new Date(),
      },
    ],
  };

  const mockProduct = {
    data: [
      {
        name: 'Product 1',
        code: 'P001',
        uuid: 'uuid1',
        updatedAt: new Date(),
      },
    ],
  };

  beforeEach(async () => {
    const mockPrismaService = {
      product: {
        findMany: jest.fn().mockResolvedValue(mockProducts),
        findFirst: jest.fn().mockResolvedValue(mockProduct),
        update: jest.fn().mockResolvedValue(mockProduct),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('ProductsController.findAll', async () => {
    let products = {};

    products = await controller.findAll();

    expect(products).toEqual(mockProducts);
    expect(prismaService.product.findMany).toHaveBeenCalledTimes(1);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      select: {
        name: true,
        code: true,
        uuid: true,
        updatedAt: true,
      },
    });
  });

  it('ProductsController.findOne', async () => {
    let uuid: string = 'a5f023f2-30b4-4353-8fcd-3dab2646ed0b';
    let products = {};

    products = await controller.findOne(uuid);

    expect(products).toEqual(mockProduct);
    expect(prismaService.product.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.product.findFirst).toHaveBeenCalledWith({
      where: {
        uuid: 'a5f023f2-30b4-4353-8fcd-3dab2646ed0b',
      },
      select: {
        name: true,
        code: true,
        uuid: true,
        updatedAt: true,
      },
    });
  });

  it('ProductsController.findByCode', async () => {
    let code: string = 'PZ-123-4';
    let products = {};

    products = await controller.findByCode(code);

    expect(products).toEqual(mockProducts);
    expect(prismaService.product.findMany).toHaveBeenCalledTimes(1);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      where: {
        code: 'PZ-123-4',
      },
      select: {
        name: true,
        code: true,
        uuid: true,
        updatedAt: true,
      },
    });
  });

  it('ProductsController.update', async () => {
    let uuid: string = 'a5f023f2-30b4-4353-8fcd-3dab2646ed0b';
    let products = {};
    let dto = new UpdateProductDto();

    products = await controller.update(uuid, dto);

    console.log(products);

    expect(products).toEqual(mockProduct);
    expect(prismaService.product.update).toHaveBeenCalledTimes(1);
    expect(prismaService.product.update).toHaveBeenCalledWith({
      where: { uuid: uuid },
      data: dto,
    });
  });
});
