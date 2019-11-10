import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from './tasks.enum';
import { userInfo } from 'os';
import { User } from '../auth/user.entity';

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
    
    @ManyToOne(type => User, user => user.tasks, { eager: false})
    user: User;

    @Column()
    userId: string;
}
