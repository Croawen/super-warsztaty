import { Controller, Inject, Get, Param } from '@nestjs/common';
import { BankService } from './bank.service';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiOperation,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { BalanceDto } from './dto/balance.dto';

@Controller('bank')
@ApiUseTags('bank')
export class BankController {
  constructor(@Inject(BankService) private readonly bankService: BankService) {}

  @Get('balance')
  @ApiOperation({ title: 'Get total balance of all users.' })
  @ApiOkResponse({ type: BalanceDto, description: 'Balance response' })
  async getTotalBalance(): Promise<BalanceDto> {
    return this.bankService.getTotalBalance();
  }

  @Get('balance/:address')
  @ApiOperation({ title: 'Get balance of provided address.' })
  @ApiImplicitParam({ name: 'address', type: String })
  @ApiOkResponse({ type: BalanceDto, description: 'Balance response' })
  async getBalanceOf(@Param('address') address: string): Promise<BalanceDto> {
    return this.bankService.getBalanceOf(address);
  }
}
