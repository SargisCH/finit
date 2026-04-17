import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('import_mappings')
export class ImportMapping extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  name?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  fieldMapping?: {
    name?: string;
    data?: string;
    taxid?: string;
    tax?: string;
    price?: string;
  } | null;

  @Column({ type: 'jsonb', nullable: true })
  categorization?: any | null; // Optional categorization data
}
