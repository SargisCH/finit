import {
  CompanyDetailsDto,
  DirectCostDto,
  OperatingExpensesDto,
  RevenueDetailsDto,
} from '@shared/schemas';
import { FteLevels } from '@shared/types';
import Big from 'big.js';
import { Valuation } from 'src/model/valuation.entity';

export default class ValueCalculator {
  private getPMultiple(ebidtapercentage: Big): number {
    if (ebidtapercentage.gte(30)) {
      return 6.5;
    } else if (ebidtapercentage.lt(30) && ebidtapercentage.gte(20)) {
      return 5.5;
    } else if (ebidtapercentage.lt(20) && ebidtapercentage.gte(10)) {
      return 4;
    }
    return 2.5;
  }

  private getRMultiple(mrr: Big): number {
    if (mrr.gte(70)) {
      return 1.15;
    } else if (mrr.lte(40)) {
      return 0.55;
    }
    return 0.85;
  }
  private getFteCorrection(level: FteLevels): number | undefined {
    if (level === FteLevels.LOW) {
      return 0.3;
    } else if (level === FteLevels.MEDIUM) {
      return 0;
    }
  }
  private getRFteCorrection(level: FteLevels | undefined): number | undefined {
    if (!level) return;
    if (level === FteLevels.LOW) {
      return 0.1;
    } else if (level === FteLevels.MEDIUM) {
      return 0;
    }
    return -0.1;
  }
  private getRcrCorrection(clientConcentration: Big): number {
    if (clientConcentration.lte(25)) {
      return 0.1;
    } else if (clientConcentration.gte(40)) {
      return -0.2;
    }
    return 0;
  }
  private getRRcrCorrection(clientConcentration: Big): number {
    if (clientConcentration.lte(25)) {
      return 0.05;
    } else if (clientConcentration.gte(40)) {
      return -0.1;
    }
    return 0;
  }
  public runCalculation(
    valuationDetails: CompanyDetailsDto &
      RevenueDetailsDto &
      DirectCostDto &
      OperatingExpensesDto,
  ) {
    const annualRevenue = new Big(Number(valuationDetails.monthlyRevenue));
    const developerSalaries = new Big(valuationDetails.developerSalaries).mul(
      12,
    );
    const otherDirectCost = new Big(valuationDetails.contracterPayments || 0)
      .plus(new Big(valuationDetails.projectSpecificCosts || 0))
      .plus(new Big(valuationDetails.softwareLicenses || 0))
      .mul(12);
    const grossProfit = annualRevenue
      .sub(developerSalaries || 0)
      .sub(otherDirectCost || 0);
    const operatingExpenses = new Big(valuationDetails.officeRent)
      .plus(new Big(valuationDetails.utilities || 0))
      .plus(new Big(valuationDetails.adminSalaries || 0))
      .plus(new Big(valuationDetails.marketing || 0))
      .plus(new Big(valuationDetails.otherOperatingExpenses || 0))
      .mul(12);

    const ebidta = new Big(grossProfit).sub(new Big(operatingExpenses));
    const ebidtaPercentage = new Big(ebidta)
      .div(new Big(annualRevenue))
      .mul(100);

    const tax = annualRevenue.mul(0.05);

    const netProfit = ebidta.sub(tax);

    const profitMarginPercentage = netProfit.div(annualRevenue).mul(100);
    const mrr = new Big(valuationDetails.mrr)
      .mul(new Big(12))
      .div(annualRevenue)
      .mul(100);
    const clientConcentration = new Big(valuationDetails.revenuePerClient)
      .mul(new Big(12))
      .div(annualRevenue)
      .mul(100);

    const pMultiple = this.getPMultiple(ebidtaPercentage);

    const fteCorrection = this.getFteCorrection(
      valuationDetails.fteRiskLevel as FteLevels,
    );

    const rcrCorrection = this.getRcrCorrection(clientConcentration);
    const pFinal = new Big(pMultiple)
      .plus(new Big(fteCorrection || 0))
      .plus(new Big(rcrCorrection));

    const rMultiple = this.getRMultiple(mrr);
    const rFteCorrection = this.getRFteCorrection(
      valuationDetails.fteRiskLevel as FteLevels,
    );
    const rRcrCorrection = this.getRRcrCorrection(clientConcentration);
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
