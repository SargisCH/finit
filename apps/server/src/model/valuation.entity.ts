import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValuationWip } from './valuationWip.entity';

@Entity({ name: 'valuations' })
export class Valuation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ValuationWip)
  @JoinColumn()
  wip: ValuationWip;

  @Column('numeric')
  annualRevenue: number;

  @Column('numeric')
  developerSalaries: number;

  @Column('numeric')
  otherDirectCost: number;

  @Column('numeric')
  grossProfit: number;

  @Column('numeric')
  operatingExpenses: number;

  @Column('numeric')
  ebidta: number;

  @Column('numeric')
  ebidtaPercentage: number;

  @Column('numeric')
  tax: number;

  @Column('numeric')
  netProfit: number;

  @Column('int')
  profitMarginPercentage: number;

  @Column('int')
  mrr: number;

  @Column('int')
  clientConcentration: number;

  @Column('numeric')
  valuation: number;

  @Column('numeric')
  pMultiple: number;

  @Column('numeric')
  fteCorrection: number;

  @Column('numeric')
  rcrCorrection: number;

  @Column('numeric')
  pFinal: number;

  @Column('numeric')
  rMultiple: number;

  @Column('numeric')
  rFteCorrection: number;

  @Column('numeric')
  rRcrCorrection: number;

  @Column('numeric')
  rFinal: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
