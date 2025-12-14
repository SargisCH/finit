import { ValuationStep } from "@shared/types";
import { z } from "zod";

export const companyEvaluateSchema = z
  .object({
    name: z.string().min(1, "Field cannot be empty."),
    industry: z.string().min(1, "Field cannot be empty."),
    numberOfEmployees: z.string().min(1, "Field cannot be empty."),
    monthlyRevenue: z.string().min(1, "Field cannot be empty."),
    mrr: z.string().min(1, "Field cannot be empty."),
    activeClients: z.string().min(1, "Field cannot be empty."),
    revenuePerClient: z.string().min(1, "Field cannot be empty."),
    developerSalaries: z.string().min(1, "Field cannot be empty."),
    top2Salaries: z.string().min(1, "Field cannot be empty."),
    contracterPayments: z.string().optional().default("0"),
    softwareLicenses: z.string().optional().default("0"),
    projectSpecificCosts: z.string().optional().default("0"),
    officeRent: z.string().optional().default("0"),
    utilities: z.string().optional().default("0"),
    adminSalaries: z.string().optional().default("0"),
    marketing: z.string().optional().default("0"),
    otherOperatingExpenses: z.string().optional().default("0"),
    fteRiskLevel: z.string().optional(),
  })
  .required();

export const companyDetailsSchema = z.object({
  name: z.string().min(1, "Field cannot be empty."),
  industry: z.string().min(1, "Field cannot be empty."),
  numberOfEmployees: z.string().min(1, "Field cannot be empty."),
  step: ValuationStep.CompanyDetails,
});

export const revenueDetailsSchema = z.object({
  monthlyRevenue: z.string().min(1, "Field cannot be empty."),
  mrr: z.string().min(1, "Field cannot be empty."),
  numberOfActiveClients: z.string().min(1, "Field cannot be empty."),
  revenuePerClient: z.string().min(1, "Field cannot be empty."),
  step: ValuationStep.RevenueDetails,
});

export type RevenueDetailsDto = z.infer<typeof revenueDetailsSchema>;
export type CompanyDetailsDto = z.infer<typeof companyDetailsSchema>;
export type CompanyEvaluateDto = z.infer<typeof companyEvaluateSchema>;
