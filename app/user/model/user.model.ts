import {Table, Column, Model, DataType, HasOne, BelongsTo, ForeignKey} from "sequelize-typescript";
import { UserProfile } from "../user_profile/model";


@Table
export class User extends Model<User> {
   
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    isConfirmed: boolean;

    @ForeignKey(() => UserProfile)
    @Column({
        type: DataType.INTEGER
    })
    userProfileId: number;

    @BelongsTo(() => UserProfile)
    userProfile: UserProfile;

}