import { BigNumber } from 'ethers/utils';
import { ApiResponseModelProperty } from '@nestjs/swagger';

export class BalanceDto {
  @ApiResponseModelProperty()
  balance: string;

  constructor(value: BigNumber) {
    this.balance = value.toString();
  }
}
