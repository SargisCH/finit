import { Body, Controller, Param, Post } from '@nestjs/common';
import { CompanyEvaluationWipService } from './companyEvaluationWip.service';
import type { CompanyDetailsDto, RevenueDetailsDto } from '@shared/schemas';
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
  evaluate(
    @Param('id') id: string,
    @Body() stepDetails: CompanyDetailsDto | RevenueDetailsDto,
  ): Promise<ValuationWip | null> {
    return this.companyEvaluationWipService.saveStepDetails(id, stepDetails);
  }
}
