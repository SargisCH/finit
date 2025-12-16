import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CompanyDetailsDto,
  RevenueDetailsDto,
  DirectCostDto,
  OperatingExpensesDto,
} from '@shared/schemas';
import { FteLevels, Status, ValuationStep } from '@shared/types';
import { ValuationWip } from 'src/model/valuationWip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyEvaluationWipService {
  @InjectRepository(ValuationWip)
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
    details:
      | CompanyDetailsDto
      | RevenueDetailsDto
      | DirectCostDto
      | OperatingExpensesDto,
  ): Promise<ValuationWip | null> {
    const valuationInProgress = await this.valuationWIPRepository.findOneBy({
      id,
    });
    if (!valuationInProgress || !valuationInProgress?.data) {
      throw new NotFoundException('No valuation process has been started');
    }

    if (details.step === ValuationStep.CompanyDetails) {
      const companyDetails = details as CompanyDetailsDto;
      const companyDetailsStepIndex = valuationInProgress.data.length
        ? (valuationInProgress?.data.findIndex(
            (stepDetails) => stepDetails.step === ValuationStep.CompanyDetails,
          ) ?? -1)
        : 0;
      if (
        !valuationInProgress?.data[companyDetailsStepIndex] &&
        valuationInProgress?.data.length
      ) {
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
      if (valuationInProgress.currentStep === ValuationStep.CompanyDetails) {
        valuationInProgress.currentStep = ValuationStep.RevenueDetails;
      }
      await this.valuationWIPRepository.update({ id }, valuationInProgress);
    } else if (details.step === ValuationStep.RevenueDetails) {
      const revenueDetails = details as RevenueDetailsDto;
      let revenueDetailsIndex = valuationInProgress.data.length
        ? valuationInProgress?.data.findIndex(
            (stepDetails) => stepDetails.step === ValuationStep.RevenueDetails,
          )
        : 0;
      revenueDetailsIndex =
        revenueDetailsIndex === -1
          ? valuationInProgress.data.length
          : revenueDetailsIndex;
      valuationInProgress.data[revenueDetailsIndex] = {
        ...valuationInProgress.data[revenueDetailsIndex],
        step: ValuationStep.RevenueDetails,
        status: Status.Completed,
        mrr: Number(revenueDetails.mrr),
        numberOfActiveClients: Number(revenueDetails.numberOfActiveClients),
        revenuePerClient: Number(revenueDetails.revenuePerClient),
        monthlyRevenue: Number(revenueDetails.monthlyRevenue),
      };
      if (valuationInProgress.currentStep === ValuationStep.RevenueDetails) {
        valuationInProgress.currentStep = ValuationStep.DirectConstDetails;
      }
      await this.valuationWIPRepository.update({ id }, valuationInProgress);
    } else if (details.step === ValuationStep.DirectConstDetails) {
      const directCost = details as DirectCostDto;
      let directCostIndex = valuationInProgress.data.length
        ? valuationInProgress?.data.findIndex(
            (stepDetails) =>
              stepDetails.step === ValuationStep.DirectConstDetails,
          )
        : 0;
      directCostIndex =
        directCostIndex === -1
          ? valuationInProgress.data.length
          : directCostIndex;
      valuationInProgress.data[directCostIndex] = {
        ...valuationInProgress.data[directCostIndex],
        step: ValuationStep.DirectConstDetails,
        status: Status.Completed,
        developerSalaries: Number(directCost.developerSalaries),
        top2Salaries: Number(directCost.top2Salaries),
        softwareLicenses: Number(directCost.softwareLicenses),
        contractorPayments: Number(directCost.contracterPayments),
        projectSpecificCosts: Number(directCost.projectSpecificCosts),
      };
      if (
        valuationInProgress.currentStep === ValuationStep.DirectConstDetails
      ) {
        valuationInProgress.currentStep = ValuationStep.OperatingExpenses;
      }

      await this.valuationWIPRepository.update({ id }, valuationInProgress);
    } else if (details.step === ValuationStep.OperatingExpenses) {
      const operatingExpenses = details as OperatingExpensesDto;
      let operatingExpensesIndex = valuationInProgress.data.length
        ? (valuationInProgress?.data.findIndex(
            (stepDetails) =>
              stepDetails.step === ValuationStep.OperatingExpenses,
          ) ?? -1)
        : 0;
      operatingExpensesIndex =
        operatingExpensesIndex === -1
          ? valuationInProgress.data.length
          : operatingExpensesIndex;
      valuationInProgress.data[operatingExpensesIndex] = {
        ...valuationInProgress.data[operatingExpensesIndex],
        step: ValuationStep.OperatingExpenses,
        status: Status.Completed,
        adminSalaries: Number(operatingExpenses.adminSalaries),
        marketing: Number(operatingExpenses.marketing),
        officeRent: Number(operatingExpenses.officeRent),
        otherOperatingExpenses: Number(
          operatingExpenses.otherOperatingExpenses,
        ),
        utilities: Number(operatingExpenses.utilities),
        fteRiskLevel: operatingExpenses.fteRiskLevel as FteLevels,
      };
      valuationInProgress.status = Status.Completed;
      await this.valuationWIPRepository.update({ id }, valuationInProgress);
    }

    return valuationInProgress;
  }

  getProgress(id: string) {
    return this.valuationWIPRepository.findOneBy({ id });
  }
}
