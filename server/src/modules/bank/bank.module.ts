import { BankService } from './bank.service';
import { BankContractFacade } from './contract/bank.contract.facade';
import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';

@Module({
  controllers: [BankController],
  providers: [BankService, BankContractFacade],
})
export class BankModule {}
