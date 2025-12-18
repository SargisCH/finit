import { Status, ValuationStep, FteLevels } from "@shared/types";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type CompanyEvaluationResponse = {
  annualRevenue: number;
  developerSalaries: number;
  otherDirectCost: number;
  grossProfit: number;
  operatingExpenses: number;
  ebidta: number;
  ebidtaPercentage: number;
  tax: number;
  netProfit: number;
  profitMarginPercentage: number;
  mrr: number;
  clientConcentration: number;
  valuation: number;
  pMultiple: number;
  fteCorrection?: number;
  rcrCorrection: number;
  pFinal: number;
  rMultiple: number;
  rFteCorrection?: number;
  rRcrCorrection: number;
  rFinal: number;
};

export type EvaluationProgress = {
  id: string;
  currentStep: ValuationStep;
  status: Status;
  createdAt: Date;
  data: Array<
    | {
        companyName: string;
        industry: string;
        numberOfEmployees: number;
        step: ValuationStep.CompanyDetails;
        status: string;
      }
    | {
        numberOfActiveClients: number;
        monthlyRevenue?: number;
        mrr: number;
        revenuePerClient: number;
        step: ValuationStep.RevenueDetails;
        status: string;
      }
    | {
        developerSalaries: number;
        top2Salaries: number;
        contractorPayments: number;
        softwareLicenses: number;
        projectSpecificCosts: number;
        step: ValuationStep.DirectConstDetails;
        status: string;
      }
    | {
        officeRent: number;
        utilities: number;
        adminSalaries: number;
        marketing: number;
        otherOperatingExpenses: number;
        fteRiskLevel: FteLevels;
        status: string;
        step: ValuationStep.OperatingExpenses;
      }
  >;
};

export type EvaluationResult = {
  id: string;
  wip?: EvaluationProgress;
  wipId: string;
  annualRevenue: number;
  developerSalaries: number;
  otherDirectCost: number;
  grossProfit: number;
  operatingExpenses: number;
  ebidta: number;
  ebidtaPercentage: number;
  tax: number;
  netProfit: number;
  profitMarginPercentage: number;
  mrr: number;
  clientConcentration: number;
  valuation: number;
  pMultiple: number;
  fteCorrection: number;
  rcrCorrection: number;
  pFinal: number;
  rMultiple: number;
  rFteCorrection: number;
  rRcrCorrection: number;
  rFinal: number;
  createdAt: Date;
};

export type EvaluationProgressDto = Optional<EvaluationProgress, "id">;
