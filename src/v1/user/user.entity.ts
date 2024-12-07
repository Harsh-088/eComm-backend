import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm"

@Entity({ name: "user" })
export class User {
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
}
