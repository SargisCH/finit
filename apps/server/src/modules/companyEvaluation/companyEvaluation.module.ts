import { Module } from '@nestjs/common';
import { CompanyEvaluationController } from './companyEvaluation.controller';
import { CompanyEvaluationService } from './companyEvaluation.service';
import { CompanyEvaluationWipService } from '../companyEvaluationWip/companyEvaluationWip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuationWip } from 'src/model/valuationWip.entity';
import { Valuation } from 'src/model/valuation.entity';
import { CompanyEvaluationWipModule } from '../companyEvaluationWip/companyEvaluationWip.module';

@Module({
  imports: [
    CompanyEvaluationWipModule,
    TypeOrmModule.forFeature([ValuationWip, Valuation]), // ← Add this here!
  ],
  controllers: [CompanyEvaluationController],
  providers: [CompanyEvaluationService],
})
export class CompanyEvaluationModule {}
