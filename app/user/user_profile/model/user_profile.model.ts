import { Model, Column, Table, DataType, BelongsTo, HasOne } from "sequelize-typescript";
import { User } from "../../model";


@Table
export class UserProfile extends Model<UserProfile> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        
    })
    user_likes: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    user_name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    user_photo: string;


    @HasOne(() => User)
    user: User;
}