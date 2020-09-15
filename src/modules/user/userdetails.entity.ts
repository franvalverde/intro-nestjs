import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_details')

export class UserDetails extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "varchar", length: 50, nullable: true })
    name: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    lastname: string;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: 'updated_at', nullable: true })
    updatedAt: Date;
}
