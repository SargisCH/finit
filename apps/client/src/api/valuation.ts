import {
  CompanyDetailsDto,
  DirectCostDto,
  OperatingExpensesDto,
  RevenueDetailsDto,
} from "@shared/schemas";
import { get, post } from "./index";
import { EvaluationProgress, EvaluationResult } from "@shared/schemas/src";

export const evaluateCompanyDetails = (id: string, data: CompanyDetailsDto) => {
  return post<CompanyDetailsDto, EvaluationProgress & { id: string }>(
    `companyEvaluationWip/${id}/completeStep`,
    data,
  );
};

export const evaluateRevenueDetails = (id: string, data: RevenueDetailsDto) => {
  return post<RevenueDetailsDto, EvaluationProgress & { id: string }>(
    `companyEvaluationWip/${id}/completeStep`,
    data,
  );
};
export const evaluateDirectCostDetails = (id: string, data: DirectCostDto) => {
  return post<DirectCostDto, EvaluationProgress & { id: string }>(
    `companyEvaluationWip/${id}/completeStep`,
    data,
  );
};
export const evaluateOperatingExpensesDetails = (
  id: string,
  data: OperatingExpensesDto,
) => {
  return post<OperatingExpensesDto, EvaluationProgress & { id: string }>(
    `companyEvaluationWip/${id}/completeStep`,
    data,
  );
};
export const startValuation = () => {
  return post<any, EvaluationProgress>("companyEvaluationWip/start", {});
};

export const getValuationProgress = (id: string) => {
  return get<EvaluationProgress>(`companyEvaluationWip/${id}`);
};

export const getValuationResult = (id: string) => {
  return get<EvaluationResult>(`companyEvaluation/${id}/evaluate`);
};
