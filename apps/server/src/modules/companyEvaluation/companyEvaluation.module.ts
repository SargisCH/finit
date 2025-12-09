import { Module } from '@nestjs/common';
import { CompanyEvaluationController } from './companyEvaluation.controller';
import { CompanyEvaluationService } from './companyEvaluation.service';

@Module({
  imports: [],
  controllers: [CompanyEvaluationController],
  providers: [CompanyEvaluationService],
})
export class CompanyEvaluationModule {}
