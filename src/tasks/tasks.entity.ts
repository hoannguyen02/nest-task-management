import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { TaskStatus } from './tasks.enum';

@Entity()
export class Task  extends BaseEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
}
