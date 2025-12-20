import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyEvaluationWipService } from './companyEvaluationWip.service';
import type {
  CompanyDetailsDto,
  DirectCostDto,
  OperatingExpensesDto,
  RevenueDetailsDto,
} from '@shared/schemas';
import { ValuationWip } from 'src/model/valuationWip.entity';

@Controller('/companyEvaluationWip')
export class CompanyEvaluationWipController {
  constructor(
    private readonly companyEvaluationWipService: CompanyEvaluationWipService,
  ) {}

  @Post('/start')
  getHello(): Promise<ValuationWip> {
    return this.companyEvaluationWipService.startEvaluationProcess();
  }
  @Post('/:id/completeStep')
  completeStep(
    @Param('id') id: string,
    @Body()
    stepDetails:
      | CompanyDetailsDto
      | RevenueDetailsDto
      | DirectCostDto
      | OperatingExpensesDto,
  ): Promise<ValuationWip | null> {
    return this.companyEvaluationWipService.saveStepDetails(id, stepDetails);
  }

  @Get('/:id')
  getProgress(@Param('id') id: string): Promise<ValuationWip | null> {
    return this.companyEvaluationWipService.getProgress(id);
  }
}
