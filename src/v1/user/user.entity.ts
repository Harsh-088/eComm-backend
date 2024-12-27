import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm"
import { DBDataModal } from "../../core/abstract"

@Entity({ name: "user" })
export class User extends DBDataModal {
  @ObjectIdColumn()
  _id!: ObjectId

  @Column("varchar", { length: 255 })
  name!: string

  @Column("varchar", { length: 255 })
  email!: string

  @Column("varchar", { length: 255 })
  password!: string

  @Column("varchar", { length: 255 })
  address!: string

  @Column("timestamp")
  createdOn!: string

  // @CreateDateColumn({ type: "timestamp" })
  // createdAt!: Date

  // @UpdateDateColumn({ type: "timestamp", nullable: true })
  // updatedAt?: Date
}
