import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('SearchController', () => {
  let controller: UserController;
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
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
