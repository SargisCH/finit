import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyDetailsDto, RevenueDetailsDto } from '@shared/schemas';
import { Status, ValuationStep } from '@shared/types';
import { ValuationWip } from 'src/model/valuationWip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyEvaluationWipService {
  private valuationWIPRepository: Repository<ValuationWip>;

  async startEvaluationProcess() {
    const valuationInProgress = await this.valuationWIPRepository.save({
      currentStep: ValuationStep.CompanyDetails,
      data: [],
      status: Status.InProgress,
    });
    return valuationInProgress;
  }

  async saveStepDetails(
    id: string,
    details: CompanyDetailsDto | RevenueDetailsDto,
  ): Promise<ValuationWip | null> {
    const valuationInProgress = await this.valuationWIPRepository.findOneBy({
      id,
    });
    if (details.step === ValuationStep.CompanyDetails) {
      const companyDetails = details as CompanyDetailsDto;
      const companyDetailsStepIndex =
        valuationInProgress?.data.findIndex(
          (stepDetails) => stepDetails.step === ValuationStep.CompanyDetails,
        ) ?? -1;
      if (!valuationInProgress?.data[companyDetailsStepIndex]) {
        throw new NotFoundException(
          `Evaluation process has not been found with id ${id}`,
        );
      }
      valuationInProgress.data[companyDetailsStepIndex] = {
        ...valuationInProgress.data[companyDetailsStepIndex],
        numberOfEmployees: Number(companyDetails.numberOfEmployees),
        step: ValuationStep.CompanyDetails,
        status: Status.Completed,
        companyName: companyDetails.name,
        industry: companyDetails.industry,
      };
      await this.valuationWIPRepository.update({ id }, valuationInProgress);
    } else if (details.step === ValuationStep.RevenueDetails) {
      const revenueDetails = details as RevenueDetailsDto;
      const revenueDetailsIndex =
        valuationInProgress?.data.findIndex(
          (stepDetails) => stepDetails.step === ValuationStep.RevenueDetails,
        ) ?? -1;
      if (!valuationInProgress?.data[revenueDetailsIndex]) {
        throw new NotFoundException(
          `Evaluation process has not been found with id ${id}`,
        );
      }
      valuationInProgress.data[revenueDetailsIndex] = {
        ...valuationInProgress.data[revenueDetailsIndex],
        step: ValuationStep.RevenueDetails,
        status: Status.Completed,
        mrr: Number(revenueDetails.mrr),
        numberOfActiveClients: Number(revenueDetails.numberOfActiveClients),
        revenuePerClient: Number(revenueDetails.revenuePerClient),
        monthlyRevenue: Number(revenueDetails.monthlyRevenue),
      };

      await this.valuationWIPRepository.update({ id }, valuationInProgress);
    }

    return valuationInProgress;
  }
}
