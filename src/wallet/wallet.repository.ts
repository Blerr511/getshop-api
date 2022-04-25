import { Repository, EntityRepository } from 'typeorm';
import { Wallet } from '@modules/entities/wallet.entity';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {}
