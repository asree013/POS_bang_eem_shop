import { Test, TestingModule } from '@nestjs/testing';
import { PrompayController } from './prompay.controller';

describe('PrompayController', () => {
  let controller: PrompayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrompayController],
    }).compile();

    controller = module.get<PrompayController>(PrompayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
