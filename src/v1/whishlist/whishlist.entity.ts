import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm"
import { DBDataModal } from "../../core/abstract"

@Entity({ name: "whishlist" })
export class Whishlist extends DBDataModal {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column("varchar")
  productId!: string

  @Column("varchar")
  userId!: string

  //   @CreateDateColumn({ type: "timestamp" })
  //   createdAt!: Date

  //   @UpdateDateColumn({ type: "timestamp", nullable: true })
  //   updatedAt?: Date
}
