import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class LogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({default: null, nullable: true})
  input?: string;

  @Column({default: null, nullable: true})
  output?: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column()
  message: string;

  @CreateDateColumn()
  timestamp: Date;
}
