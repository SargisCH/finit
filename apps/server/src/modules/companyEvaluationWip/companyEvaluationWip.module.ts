import { Module } from '@nestjs/common';
import { CompanyEvaluationWipController } from './companyEvaluationWip.controller';
import { CompanyEvaluationWipService } from './companyEvaluationWip.service';

@Module({
  imports: [],
  controllers: [CompanyEvaluationWipController],
  providers: [CompanyEvaluationWipService],
})
export class CompanyEvaluationModule {}
