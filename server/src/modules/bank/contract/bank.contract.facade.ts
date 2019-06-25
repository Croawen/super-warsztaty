import { Wallet, Contract, getDefaultProvider } from 'ethers';
import { Injectable } from '@nestjs/common';
import { bankContractABI } from './bank.contract.abi';
import { BigNumber } from 'ethers/utils';

enum BankContractEvents {
  Deposit = 'LogDeposit',
  Withdrawal = 'LogWithdrawal',
}

@Injectable()
export class BankContractFacade {
  private walletPrivateKey: string = '';
  private contractAddr: string = '';
  private wallet: Wallet;
  private contract: Contract;
  private contractConnected: boolean = false;

  constructor() {
    this.init();
  }

  private init(): boolean {
    try {
      // Set network provider for ethersjs
      // 'kovan' - eth test network
      // 'homestead - public eth network
      const networkName = 'kovan';
      const provider = getDefaultProvider(networkName);
      this.wallet = new Wallet(this.walletPrivateKey, provider);
      this.contract = new Contract(
        this.contractAddr,
        bankContractABI,
        this.wallet,
      );

      // this.mapEvents();
      this.contractConnected = true;
      // tslint:disable-next-line: no-console
      console.log('contract connected');
      return true;
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log('Error during contract init:', e);
      return false;
    }
  }

  private checkConnection(): boolean {
    if (!this.contractConnected) {
      return this.init();
    }

    return true;
  }
}
