import {
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm"
import { Column } from "typeorm/decorator/columns/Column"

// type CartProduct = {
//   productId: ObjectId
//   quantity: number
// }

export class CartProduct {
  @Column(type => ObjectId)
  productId!: ObjectId

  @Column("int")
  quantity!: number
}

@Entity({ name: "cart" })
export class Cart {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column("bytes")
  userId!: ObjectId

  @Column("array")
  products!: CartProduct[]

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: Date
}
