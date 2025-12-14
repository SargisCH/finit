import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum FteLevels {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

@Entity({ name: 'valuations' })
export class Valuation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  companyName: string;

  @Column('varchar')
  industry: string;

  @Column('int')
  numberOfEmployees: number;

  @Column('int')
  numberOfActiveClients: number;

  @Column('numeric')
  monthlyRevenue: number;

  @Column('numeric')
  mrr: number;

  @Column('numeric')
  revenuePerClient: number;

  @Column('numeric')
  developerSalaries: number;

  @Column('numeric')
  top2Salaries: number;

  @Column('numeric')
  contractorPayments: number;

  @Column('numeric')
  softwareLicenses: number;

  @Column('numeric')
  projectSpecificCosts: number;

  @Column('numeric')
  officeRent: number;

  @Column('numeric')
  utilities: number;

  @Column('numeric')
  adminSalaries: number;

  @Column('numeric')
  marketing: number;

  @Column('numeric')
  otherOperatingExpenses: number;

  @Column('varchar')
  fteRiskLevel: FteLevels;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
