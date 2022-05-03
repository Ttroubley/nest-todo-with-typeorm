import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public body: string;

  @Column()
  public state: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
