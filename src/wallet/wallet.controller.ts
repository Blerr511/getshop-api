import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WalletCreateDto } from './dto/wallet.create.dto';
import { WalletResponseDto } from './dto/wallet.response.dto';
import { User, UserInfo } from '@shared/decorators/User';
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
    @User() user: UserInfo,
  ): Promise<WalletResponseDto> {
    return await this.walletService.createWallet(dto, user);
  }

  @Post('send/:recipientId/:walletId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async sendWallet(
    @User() user: UserInfo,
    @Param('recipientId') recipientId: number,
    @Param('walletId') walletId: number,
  ): Promise<WalletResponseDto> {
    return await this.walletService.sendWallet(user, recipientId, walletId);
  }

  @Get('my/all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllWalletsUser(
    @User() user: UserInfo,
  ): Promise<WalletResponseDto[]> {
    return await this.walletService.getAllWalletsUser(user);
  }

  @Get('my/one')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getOneWallet(
    @User() user: UserInfo,
    @Query() dto: WalletResponseDto,
  ): Promise<string> {
    return await this.walletService.getOneWallet(user, dto);
  }
}
