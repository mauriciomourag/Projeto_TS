import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db";

interface IUser{
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export type UserCreationAttributes = Optional<IUser, 'id'>;

export class User extends Model<IUser, UserCreationAttributes> implements IUser{
    public id!: number
    public name!: string 
    public email!: string 
    public username!: string 
    public password!: string 
    public createdAt!: Date 
    public updatedAt!: Date 
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        }
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'user',
    }
)