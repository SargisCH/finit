import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

export interface ExpenseItem {
  description: string;
  amount: number;
  count: number;
}

export interface ExpenseCategory {
  name: string;
  total: number;
  percentage: number;
  expenses: ExpenseItem[];
}

export interface AnalysisResult {
  language: string;
  totalAmount: number;
  currency: string;
  categories: ExpenseCategory[];
}

const responseSchema = {
  type: 'object',
  properties: {
    language: { type: 'string' },
    totalAmount: { type: 'number' },
    currency: { type: 'string' },
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          total: { type: 'number' },
          percentage: { type: 'number' },
          expenses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                description: { type: 'string' },
                amount: { type: 'number' },
                count: { type: 'number' },
              },
              required: ['description', 'amount', 'count'],
            },
          },
        },
        required: ['name', 'total', 'percentage', 'expenses'],
      },
    },
  },
  required: ['language', 'totalAmount', 'currency', 'categories'],
};

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
      throw new InternalServerErrorException('GEMINI_API_KEY not set');
    this.ai = new GoogleGenAI({ apiKey });
  }

  async analyzeExpenses(
    rows: Record<string, any>[],
    fieldMapping?: Record<string, string>,
  ): Promise<AnalysisResult> {
    const mappingInfo =
      fieldMapping && Object.values(fieldMapping).some(Boolean)
        ? `Field mapping provided (system field → file column): ${JSON.stringify(fieldMapping)}`
        : 'No field mapping provided — auto-detect which columns represent expense name, amount, date, etc.';

    const dataStr = JSON.stringify(rows.slice(0, 300));

    const prompt = `You are an expense categorization assistant. Analyze the expense data below.

Instructions:
1. Detect the language of the expense descriptions (return "en" for English, "hy" for Armenian). Use that same language for all category names in your response.
2. ${mappingInfo}
3. Group all expenses into meaningful categories (e.g. Food, Transport, Utilities, Salaries, Marketing, etc.). Use categories that match the actual data — don't force data into categories that don't fit.
4. Combine identical or very similar expense descriptions into one entry with a count.
5. Calculate total amount and percentage per category. Percentages must sum to 100.
6. Detect the currency from the data (AMD, USD, EUR, etc.). If mixed currencies, use the dominant one.
7. The "totalAmount" is the sum of ALL expenses.

Data:
${dataStr}`;

    const models = [
      'gemini-2.0-flash-lite',
      'gemini-2.0-flash',
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.5-pro',
    ];
    let lastError: unknown;

    for (const model of models) {
      try {
        const response = await this.ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema,
          },
        });
        return JSON.parse(response.text!) as AnalysisResult;
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError;
  }
}
