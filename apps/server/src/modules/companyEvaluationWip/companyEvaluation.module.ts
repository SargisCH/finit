import { Module } from '@nestjs/common';
import { CompanyEvaluationController } from './companyEvaluationWip.controller';
import { CompanyEvaluationService } from './companyEvaluationWip.service';

@Module({
  imports: [],
  controllers: [CompanyEvaluationController],
  providers: [CompanyEvaluationService],
})
export class CompanyEvaluationModule {}
