import { Injectable, Inject } from '@nestjs/common';
import { BankContractFacade } from './contract/bank.contract.facade';
import { BalanceDto } from './dto/balance.dto';
import { BigNumber } from 'ethers/utils';

@Injectable()
export class BankService {
  constructor(
    @Inject(BankContractFacade)
    private readonly bankContractFacade: BankContractFacade,
  ) {}

  async getTotalBalance(): Promise<BalanceDto> {
    return new BalanceDto(new BigNumber(0));
    // return new BalanceDto(await this.bankContractFacade.getTotalBalance());
  }

  async getBalanceOf(address: string): Promise<BalanceDto> {
    return new BalanceDto(new BigNumber(0));
    // return new BalanceDto(await this.bankContractFacade.getBalanceOf(address));
  }
}
