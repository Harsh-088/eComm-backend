import { Entity, ObjectId, ObjectIdColumn } from "typeorm"
import { Column } from "typeorm/decorator/columns/Column"
import { DBDataModal } from "../../core/abstract"

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
export class Cart extends DBDataModal {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column("bytes")
  userId!: ObjectId

  @Column("array")
  products!: CartProduct[]

  // @CreateDateColumn({ type: "timestamp" })
  // createdAt!: Date

  // @UpdateDateColumn({ type: "timestamp", nullable: true })
  // updatedAt?: Date
}
