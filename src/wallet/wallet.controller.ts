import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WalletCreateDto } from './dto/wallet.create.dto';
import { User, UserInfo } from '@shared/decorators/User';
import { WalletQueryDto } from '@modules/wallet/dto/wallet.query.dto';
import { WalletResponse } from './responses/wallet.response';
import { LoginInfo } from '@modules/auth/auth.types';
import {
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  Controller,
} from '@nestjs/common';

@Controller('wallet')
@ApiTags('wallet')
@ApiBearerAuth()
export class WalletController {
  constructor(public readonly walletService: WalletService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createWallet(
    @Body() dto: WalletCreateDto,
    @User() { user }: LoginInfo,
  ): Promise<WalletResponse> {
    const wallet = await this.walletService.createWallet(dto, user);
    return WalletResponse.from(wallet);
  }

  @Post('send/:recipientId/:walletId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async sendWallet(
    @User() { user }: LoginInfo,
    @Param('recipientId') recipientId: number,
    @Param('walletId') walletId: number,
  ): Promise<WalletResponse> {
    const wallet = await this.walletService.sendWallet(
      user,
      recipientId,
      walletId,
    );
    return WalletResponse.from(wallet);
  }

  @Get('my/all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllWalletsUser(@User() user: UserInfo): Promise<WalletResponse[]> {
    return await this.walletService.getAllWalletsUser(user);
  }

  @Get('my/one')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getOneWallet(
    @User() { user }: LoginInfo,
    @Query() dto: WalletQueryDto,
  ): Promise<string> {
    return await this.walletService.getOneWallet(user.id, dto);
  }
}
