import { Entity, ObjectId, ObjectIdColumn } from "typeorm"
import { Column } from "typeorm/decorator/columns/Column"

@Entity({ name: "cart" })
export class Cart {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column("varchar", { length: 255 })
  productId?: string

  //   @Column()
  //   product?: Product
}
