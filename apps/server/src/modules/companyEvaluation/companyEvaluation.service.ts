import { Injectable } from '@nestjs/common';
import type {
  CompanyEvaluateDto,
  CompanyEvaluationResponse,
} from '@shared/schemas';
import Big from 'big.js';

enum FteLevels {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
enum RcrLevels {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

function getPMultiple(ebidtapercentage: Big): number {
  if (ebidtapercentage.gte(30)) {
    return 6.5;
  } else if (ebidtapercentage.lt(30) && ebidtapercentage.gte(20)) {
    return 5.5;
  } else if (ebidtapercentage.lt(20) && ebidtapercentage.gte(10)) {
    return 4;
  }
  return 2.5;
}

function getRMultiple(mrr: Big): number {
  if (mrr.gte(70)) {
    return 1.15;
  } else if (mrr.lte(40)) {
    return 0.55;
  }
  return 0.85;
}
function getFteCorrection(level: FteLevels): number | undefined {
  if (level === FteLevels.LOW) {
    return 0.3;
  } else if (level === FteLevels.MEDIUM) {
    return 0;
  }
}
function getRFteCorrection(level: FteLevels | undefined): number | undefined {
  if (!level) return;
  if (level === FteLevels.LOW) {
    return 0.1;
  } else if (level === FteLevels.MEDIUM) {
    return 0;
  }
  return -0.1;
}
function getRcrCorrection(clientConcentration: Big): number {
  if (clientConcentration.lte(25)) {
    return 0.1;
  } else if (clientConcentration.gte(40)) {
    return -0.2;
  }
  return 0;
}
function getRRcrCorrection(clientConcentration: Big): number {
  if (clientConcentration.lte(25)) {
    return 0.05;
  } else if (clientConcentration.gte(40)) {
    return -0.1;
  }
  return 0;
}

@Injectable()
export class CompanyEvaluationService {
  evaluate(
    companyEvaluationDto: CompanyEvaluateDto,
  ): CompanyEvaluationResponse {
    const annualRevenue = new Big(Number(companyEvaluationDto.monthlyRevenue));
    const developerSalaries = new Big(
      companyEvaluationDto.developerSalaries,
    ).mul(12);
    const otherDirectCost = new Big(
      companyEvaluationDto.contracterPayments || 0,
    )
      .plus(new Big(companyEvaluationDto.projectSpecificCosts || 0))
      .plus(new Big(companyEvaluationDto.softwareLicenses || 0))
      .mul(12);
    const grossProfit = annualRevenue
      .sub(developerSalaries || 0)
      .sub(otherDirectCost || 0);
    const operatingExpenses = new Big(companyEvaluationDto.officeRent)
      .plus(new Big(companyEvaluationDto.utilities || 0))
      .plus(new Big(companyEvaluationDto.adminSalaries || 0))
      .plus(new Big(companyEvaluationDto.marketing || 0))
      .plus(new Big(companyEvaluationDto.otherOperatingExpenses || 0))
      .mul(12);

    const ebidta = new Big(grossProfit).sub(new Big(operatingExpenses));
    const ebidtaPercentage = new Big(ebidta)
      .div(new Big(annualRevenue))
      .mul(100);

    const tax = annualRevenue.mul(0.05);

    const netProfit = ebidta.sub(tax);

    const profitMarginPercentage = netProfit.div(annualRevenue).mul(100);
    const mrr = new Big(companyEvaluationDto.mrr)
      .mul(new Big(12))
      .div(annualRevenue)
      .mul(100);
    const clientConcentration = new Big(companyEvaluationDto.revenuePerClient)
      .mul(new Big(12))
      .div(annualRevenue)
      .mul(100);

    const pMultiple = getPMultiple(ebidtaPercentage);

    const fteCorrection = getFteCorrection(
      companyEvaluationDto.fteRiskLevel as FteLevels,
    );

    const rcrCorrection = getRcrCorrection(clientConcentration);
    const pFinal = new Big(pMultiple)
      .plus(new Big(fteCorrection || 0))
      .plus(new Big(rcrCorrection));

    const rMultiple = getRMultiple(mrr);
    const rFteCorrection = getRFteCorrection(
      companyEvaluationDto.fteRiskLevel as FteLevels,
    );
    const rRcrCorrection = getRRcrCorrection(clientConcentration);
    const rFinal = new Big(rMultiple)
      .plus(new Big(rRcrCorrection))
      .plus(new Big(rFteCorrection || 0));
    const valueation = annualRevenue.mul(rFinal).plus(ebidta.mul(pFinal));
    return {
      annualRevenue: annualRevenue.toString(),
      developerSalaries: developerSalaries.toString(),
      otherDirectCost: otherDirectCost.toString(),
      grossProfit: grossProfit.toString(),
      operatingExpenses: operatingExpenses.toString(),
      ebidta: ebidta.toString(),
      ebidtaPercentage: ebidtaPercentage.toString(),
      tax: tax.toString(),
      netProfit: netProfit.toString(),
      profitMarginPercentage: profitMarginPercentage.toString(),
      mrr: mrr.toString(),
      clientConcentration: clientConcentration.toString(),
      valuation: valueation.toString(),
      pMultiple: pMultiple.toString(),
      fteCorrection: fteCorrection?.toString(),
      rcrCorrection: rcrCorrection.toString(),
      pFinal: pFinal.toString(),
      rMultiple: rMultiple.toString(),
      rFteCorrection: rFteCorrection?.toString(),
      rRcrCorrection: rRcrCorrection.toString(),
      rFinal: rFinal.toString(),
    };
  }
}
