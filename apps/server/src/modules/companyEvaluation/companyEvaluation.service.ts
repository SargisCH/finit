import { BadRequestException, Injectable } from '@nestjs/common';
import type {
  CompanyDetailsDto,
  DirectCostDto,
  OperatingExpensesDto,
  RevenueDetailsDto,
} from '@shared/schemas';
import { Status } from '@shared/types';
import { Repository } from 'typeorm';
import { CompanyEvaluationWipService } from '../companyEvaluationWip/companyEvaluationWip.service';
import ValueCalculator from 'src/common/ValueCalculator';
import { Valuation } from 'src/model/valuation.entity';
import { InjectRepository } from '@nestjs/typeorm';

type MergedDetails = CompanyDetailsDto &
  RevenueDetailsDto &
  DirectCostDto &
  OperatingExpensesDto;

@Injectable()
export class CompanyEvaluationService {
  constructor(
    private readonly valuationWipService: CompanyEvaluationWipService,

    @InjectRepository(Valuation)
    private readonly repository: Repository<Valuation>,
  ) {}

  async evaluate(id: string) {
    const valuationWip = await this.valuationWipService.getProgress(id);
    const savedValauation = await this.repository.findOneBy({ wip: { id } });
    if (valuationWip?.status !== Status.Completed) {
      throw new BadRequestException('Valuation is not completed');
    }
    const valueCalculator = new ValueCalculator();
    const valuationMerged = {} as MergedDetails;
    valuationWip.data.forEach((stepData) => {
      Object.assign(valuationMerged, stepData);
    });
    const valuationResult = valueCalculator.runCalculation(valuationMerged);
    await this.repository.save({ ...valuationResult, id: savedValauation?.id });
    return valuationResult;
  }
}
