import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm"
import { DBDataModal } from "../../core/abstract"
import { Product } from "../product/product.entity"

@Entity({ name: "order" })
export class Order extends DBDataModal {
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

  // @CreateDateColumn({ type: "timestamp" })
  // createdAt!: Date

  // @UpdateDateColumn({ type: "timestamp", nullable: true })
  // updatedAt?: Date
}
