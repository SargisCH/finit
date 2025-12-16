import { Status, ValuationStep, FteLevels } from "@shared/types";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type CompanyEvaluationResponse = {
  annualRevenue: string;
  developerSalaries: string;
  otherDirectCost: string;
  grossProfit: string;
  operatingExpenses: string;
  ebidta: string;
  ebidtaPercentage: string;
  tax: string;
  netProfit: string;
  profitMarginPercentage: string;
  mrr: string;
  clientConcentration: string;
  valuation: string;
  pMultiple: string;
  fteCorrection?: string;
  rcrCorrection: string;
  pFinal: string;
  rMultiple: string;
  rFteCorrection?: string;
  rRcrCorrection: string;
  rFinal: string;
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
  annualRevenue: string;
  developerSalaries: string;
  otherDirectCost: string;
  grossProfit: string;
  operatingExpenses: string;
  ebidta: string;
  ebidtaPercentage: string;
  tax: string;
  netProfit: string;
  profitMarginPercentage: string;
  mrr: string;
  clientConcentration: string;
  valuation: string;
  pMultiple: string;
  fteCorrection: string;
  rcrCorrection: string;
  pFinal: string;
  rMultiple: string;
  rFteCorrection: string;
  rRcrCorrection: string;
  rFinal: string;
  createdAt: Date;
};

export type EvaluationProgressDto = Optional<EvaluationProgress, "id">;
