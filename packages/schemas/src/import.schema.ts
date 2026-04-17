import { z } from "zod";

export const fieldMappingSchema = z.object({
  name: z.string().optional(),
  data: z.string().optional(),
  taxid: z.string().optional(),
  tax: z.string().optional(),
  price: z.string().optional(),
});

export const importCategorizationSchema = z.object({
  name: z.string().optional(),
  categorization: z.any(),
});

export const importMappingRequestSchema = z.object({
  name: z.string().optional(),
  fieldMapping: fieldMappingSchema,
});

export const expenseItemSchema = z.object({
  description: z.string(),
  amount: z.number(),
  count: z.number(),
});

export const expenseCategorySchema = z.object({
  name: z.string(),
  total: z.number(),
  percentage: z.number(),
  expenses: z.array(expenseItemSchema),
});

export const analysisResultSchema = z.object({
  language: z.string(),
  totalAmount: z.number(),
  currency: z.string(),
  categories: z.array(expenseCategorySchema),
});

export type FieldMappingDto = z.infer<typeof fieldMappingSchema>;
export type ImportCategorizationDto = z.infer<typeof importCategorizationSchema>;
export type ImportMappingRequestDto = z.infer<typeof importMappingRequestSchema>;
export type ExpenseItem = z.infer<typeof expenseItemSchema>;
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;
