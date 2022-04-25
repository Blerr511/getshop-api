import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletRepository } from './wallet.repository';
import { WalletHelper } from '@modules/helpers/wallet.helper';
import { User } from '@modules/entities/user.entity';
import { Repository } from 'typeorm';
import { EmailHelper } from '@modules/helpers/email.helper';
import { ErrorList } from '@modules/common/error-list';
import {
  WalletCreateInterface,
  WalletCredentialsInterface,
} from '@modules/wallet/wallet.types';
import { Wallet } from '@modules/entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    public readonly walletRepository: WalletRepository,
    public readonly walletHelper: WalletHelper,
    public readonly emailHelper: EmailHelper,
  ) {}

  async createWallet(
    walletPayload: WalletCreateInterface,
    user: User,
  ): Promise<Wallet> {
    const password = this.walletHelper.generatePassword();
    const checkWallet = await this.walletRepository.findOne({
      where: {
        walletJson: walletPayload.walletJson,
      },
    });
    if (checkWallet) {
      throw new ConflictException(ErrorList.existingWallet);
    }
    const wallet = await this.walletRepository.create({
      walletJson: this.walletHelper.hashWallet(walletPayload.walletJson),
      username: user.email,
      password,
      user,
    });
    const savedWallet = await this.walletRepository.save(wallet);
    return this.walletRepository.findOne(savedWallet.id);
  }

  async sendWallet(
    user: User,
    recipientId: number,
    walletId: number,
  ): Promise<Wallet> {
    const recipient = await this.userRepository.findOne({ id: recipientId });
    if (!recipient) {
      throw new NotFoundException(ErrorList.userNotFound);
    }
    const wallet = await this.walletRepository.findOne({ id: walletId });
    if (!wallet) {
      throw new NotFoundException(ErrorList.walletNotFound);
    }
    wallet.username = recipient.email;
    wallet.password = this.walletHelper.generatePassword();
    wallet.user = recipient;
    await this.emailHelper.sendWalletSendEmail(
      recipient.email,
      wallet.username,
      wallet.password,
    );
    return await this.walletRepository.save(wallet);
  }

  async getAllWalletsUser(user: User): Promise<Wallet[]> {
    return await this.walletRepository
      .createQueryBuilder('wallet')
      .where('wallet.user = :userId', { userId: user.id })
      .select('wallet.id')
      .getMany();
  }

  async getOneWallet(
    userId: number,
    walletCredentials: WalletCredentialsInterface,
  ): Promise<string> {
    const wallet = await this.walletRepository.findOne({
      where: {
        username: walletCredentials.username,
        password: walletCredentials.password,
        user: userId,
      },
    });
    if (!wallet) {
      throw new NotFoundException(ErrorList.walletNotFound);
    }
    return this.walletHelper.decodeWallet(wallet.walletJson);
  }
}
