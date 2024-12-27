import { CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class DBDataModal {
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: Date
}
