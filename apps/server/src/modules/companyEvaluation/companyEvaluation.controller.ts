import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CompanyEvaluationService } from './companyEvaluation.service';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { companyEvaluateSchema } from '@shared/schemas';
import type { CompanyEvaluationResponse } from '@shared/schemas';

@Controller('/companyEvaluation')
export class CompanyEvaluationController {
  constructor(
    private readonly companyEvaluationService: CompanyEvaluationService,
  ) {}

  @Get(':id/evaluate')
  evaluate(@Param('id') id: string): Promise<CompanyEvaluationResponse> {
    return this.companyEvaluationService.evaluate(id);
  }
}
