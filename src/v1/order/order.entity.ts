import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm"
import { Product } from "../product/product.entity"

@Entity({ name: "order" })
export class Order {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column("varchar", { length: 255 })
  userId!: ObjectId

  @Column("varchar", { length: 255 })
  userName!: string

  @Column("varchar", { length: 255 })
  userEmail!: string

  @Column("varchar", { length: 255 })
  paymentId!: string

  @Column("number")
  deliveryCharge!: number

  @Column("number")
  gstCharge!: number

  @Column("number")
  totalAmount!: number

  @Column("array")
  products!: Product[]

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: Date
}
