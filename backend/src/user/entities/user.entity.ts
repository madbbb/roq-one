import { UserLoginHistoryEntity } from 'src/user/entities';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, type: 'varchar', collation: 'case_insensitive' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  phone?: string;

  @Column({ nullable: true, type: 'varchar' })
  firstName?: string;

  @Column({ nullable: true, type: 'varchar' })
  lastName?: string;

  @Column({ nullable: true, type: 'varchar' })
  locale?: string;

  @Column({ nullable: true, type: 'varchar' })
  timezone?: string;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  roqIdentifier: string;

  @Column({ nullable: true, type: 'timestamp' })
  optedInAt?: Date;

  @Column({ nullable: true, default: true, type: 'boolean' })
  active?: boolean;

  @Column({ nullable: true, default: false, type: 'boolean' })
  sync?: boolean;

  @OneToMany(() => UserLoginHistoryEntity, (userLoginHistory) => userLoginHistory.user)
  userLoginHistories: UserLoginHistoryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
