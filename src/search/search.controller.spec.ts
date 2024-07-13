import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SearchController', () => {
  let controller: SearchController;
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

  beforeEach(async () => {
    const mockPrismaService = {
      product: {
        findMany: jest.fn().mockResolvedValue(mockProducts),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        SearchService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('ProductsController.findAll', async () => {
    let q = 'a5f023f2-30b4-4353-8fcd-3dab2646ed0b';
    let products = {};

    products = await controller.search(q);

    expect(products).toEqual(mockProducts);
    expect(prismaService.product.findMany).toHaveBeenCalledTimes(1);
    expect(prismaService.product.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          {
            name: {
              contains: 'a5f023f2-30b4-4353-8fcd-3dab2646ed0b',
              mode: 'insensitive',
            },
          },
          {
            code: {
              contains: 'a5f023f2-30b4-4353-8fcd-3dab2646ed0b',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  });
});
