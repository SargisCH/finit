import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CompanyEvaluationService } from './companyEvaluation.service';
import { ZodValidationPipe } from 'src/common/pipes/validation.pipe';
import { companyEvaluateSchema } from '@shared/schemas';
import type {
  CompanyEvaluateDto,
  CompanyEvaluationResponse,
} from '@shared/schemas';

@Controller('/companyEvaluation')
export class CompanyEvaluationController {
  constructor(
    private readonly companyEvaluationService: CompanyEvaluationService,
  ) {}

  @Get('/evaluate')
  getHello(): string {
    return 'sadasd';
  }
  @Post('/evaluate')
  @UsePipes(new ZodValidationPipe(companyEvaluateSchema))
  evaluate(
    @Body() createCatDto: CompanyEvaluateDto,
  ): CompanyEvaluationResponse {
    console.log('create cat dto', createCatDto);
    return this.companyEvaluationService.evaluate(createCatDto);
  }
}
