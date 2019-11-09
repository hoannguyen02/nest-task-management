import { PrimaryColumn, Column, BaseEntity, Entity, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        
        return hash === this.password;
    }
}
