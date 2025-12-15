import { CompanyDetailsDto } from "@shared/schemas";
import { get, post } from "./index";

export const evaluateCompanyDetails = (id: string, data: CompanyDetailsDto) => {
  return post<CompanyDetailsDto, CompanyDetailsDto & { id: string }>(
    `companyEvaluationWip/${id}/completeStep`,
    data,
  );
};
export const startValuation = () => {
  return post("companyEvaluationWip/start", {});
};
