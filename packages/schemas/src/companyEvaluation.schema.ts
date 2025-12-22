import { ValuationStep } from "@shared/types";
import { z } from "zod";

export const companyEvaluateSchema = z
  .object({
    name: z.string().min(1, "Field cannot be empty."),
    industry: z.string().min(1, "Field cannot be empty."),
    numberOfEmployees: z.number().min(1, "Field cannot be empty."),
    monthlyRevenue: z.number().min(1, "Field cannot be empty."),
    mrr: z.number().min(1, "Field cannot be empty."),
    activeClients: z.number().min(1, "Field cannot be empty."),
    revenuePerClient: z.number().min(1, "Field cannot be empty."),
    developerSalaries: z.number().min(1, "Field cannot be empty."),
    top2Salaries: z.number().min(1, "Field cannot be empty."),
    contracterPayments: z.number().optional().default(0),
    softwareLicenses: z.number().optional().default(0),
    projectSpecificCosts: z.number().optional().default(0),
    officeRent: z.number().optional().default(0),
    utilities: z.number().optional().default(0),
    adminSalaries: z.number().optional().default(0),
    marketing: z.number().optional().default(0),
    otherOperatingExpenses: z.number().optional().default(0),
    fteRiskLevel: z.string(),
  })
  .required();

export const companyDetailsSchema = z.object({
  name: z.string().min(1, "Field cannot be empty."),
  industry: z.string().min(1, "Field cannot be empty."),
  numberOfEmployees: z.number().min(1, "Field cannot be empty."),
  step: ValuationStep.CompanyDetails,
});

export const revenueDetailsSchema = z.object({
  monthlyRevenue: z.number().min(1, "Field cannot be empty."),
  mrr: z.number().min(1, "Field cannot be empty."),
  numberOfActiveClients: z.number().min(1, "Field cannot be empty."),
  revenuePerClient: z.number().min(1, "Field cannot be empty."),
  step: ValuationStep.RevenueDetails,
});
export const directCostSchema = z.object({
  developerSalaries: z.number().min(1, "Field cannot be empty."),
  top2Salaries: z.number().min(1, "Field cannot be empty."),
  contracterPayments: z.number().optional().default(0),
  softwareLicenses: z.number().optional().default(0),
  projectSpecificCosts: z.number().optional().default(0),
  step: ValuationStep.DirectConstDetails,
});
export const operatingExpensesSchema = z.object({
  officeRent: z.number().optional().default(0),
  utilities: z.number().optional().default(0),
  adminSalaries: z.number().optional().default(0),
  marketing: z.number().optional().default(0),
  otherOperatingExpenses: z.number().optional().default(0),
  fteRiskLevel: z.string().min(1, "Field cannot be empty."),
  step: ValuationStep.OperatingExpenses,
});

export type RevenueDetailsDto = z.infer<typeof revenueDetailsSchema>;
export type DirectCostDto = z.infer<typeof directCostSchema>;
export type OperatingExpensesDto = z.infer<typeof operatingExpensesSchema>;
export type CompanyDetailsDto = z.infer<typeof companyDetailsSchema>;
export type CompanyEvaluateDto = z.infer<typeof companyEvaluateSchema>;
