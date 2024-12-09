import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm"

@Entity({ name: "product" })
export class Product {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column("varchar", { length: 255 })
  name?: string

  @Column("varchar", { length: 255 })
  description?: string

  @Column("varchar", { length: 255 })
  tag?: string

  @Column("double")
  rate?: number

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: Date
}
