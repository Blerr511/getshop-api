import { Test, TestingModule } from '@nestjs/testing';
import { ArcaIpayService } from './arca-ipay.service';

describe('ArcaIpayService', () => {
  let service: ArcaIpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArcaIpayService],
    }).compile();

    service = module.get<ArcaIpayService>(ArcaIpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
