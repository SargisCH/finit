import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status, ValuationStep } from '@shared/types';

enum FteLevels {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

@Entity({ name: 'valuation_wip' })
export class ValuationWip extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  currentStep: ValuationStep;

  @Column('varchar')
  status: Status;

  @Column({ type: 'jsonb', array: false, default: [] })
  data: Array<
    | {
        companyName: string;
        industry: string;
        numberOfEmployees: number;
        step: ValuationStep.CompanyDetails;
        status: string;
      }
    | {
        numberOfActiveClients: number;
        monthlyRevenue?: number;
        mrr: number;
        revenuePerClient: number;
        step: ValuationStep.RevenueDetails;
        status: string;
      }
    | {
        developerSalaries: number;
        top2Salaries: number;
        contractorPayments: number;
        softwareLicenses: number;
        projectSpecificCosts: number;
        step: ValuationStep.DirectConstDetails;
        status: string;
      }
    | {
        officeRent: number;
        utilities: number;
        adminSalaries: number;
        marketing: number;
        otherOperatingExpenses: number;
        fteRiskLevel: FteLevels;
        status: string;
        step: ValuationStep.OperatingExpenses;
      }
  >;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
