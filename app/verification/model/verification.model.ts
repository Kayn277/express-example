import { Model, Column, Table, DataType, BelongsTo, HasOne, PrimaryKey, ForeignKey } from "sequelize-typescript";
import { User } from "../../user/model";


@Table
export class Verification extends Model<Verification> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    @Column({
        type: DataType.INTEGER
    })
    generatedId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}