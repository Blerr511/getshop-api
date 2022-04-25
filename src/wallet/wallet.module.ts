import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletRepository } from './wallet.repository';
import { User } from '@modules/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletRepository, User])],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
