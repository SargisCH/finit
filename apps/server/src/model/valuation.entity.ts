import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValuationWip } from './valuationWip.entity';

enum FteLevels {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
@Entity({ name: 'valuations' })
export class Valuation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ValuationWip)
  @JoinColumn()
  wip: ValuationWip;

  @Column('varchar')
  annualRevenue: string;

  @Column('varchar')
  developerSalaries: string;

  @Column('varchar')
  otherDirectCost: string;

  @Column('varchar')
  grossProfit: string;

  @Column('varchar')
  operatingExpenses: string;

  @Column('varchar')
  ebidta: string;

  @Column('varchar')
  ebidtaPercentage: string;

  @Column('varchar')
  tax: string;

  @Column('varchar')
  netProfit: string;

  @Column('varchar')
  profitMarginPercentage: string;

  @Column('varchar')
  mrr: string;

  @Column('varchar')
  clientConcentration: string;

  @Column('varchar')
  valuation: string;

  @Column('varchar')
  pMultiple: string;

  @Column('varchar')
  fteCorrection: string;

  @Column('varchar')
  rcrCorrection: string;

  @Column('varchar')
  pFinal: string;

  @Column('varchar')
  rMultiple: string;

  @Column('varchar')
  rFteCorrection: string;

  @Column('varchar')
  rRcrCorrection: string;

  @Column('varchar')
  rFinal: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
