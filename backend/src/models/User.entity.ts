import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "name",
  })
  name!: string;

  @Column({
    name: "email",
  })
  email!: string;

  @Column({
    name: "is_verified",
  })
  isVerified!: boolean;

  @Column({
    name: "password",
  })
  password!: string;

  @Column({
    name: "profile_image",
    nullable: true,
  })
  profileImage!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  readonly createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  readonly updatedAt?: Date;
}
