import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../db";

interface IRole{
    id: number;
    title: string;
    company: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export type RoleCreationAttributes = Optional<IRole, 'id'>;

export class Role extends Model<IRole, RoleCreationAttributes> implements IRole{
    public id!: number
    public title!: string
    public company!: string
    public userId!: number
    public createdAt!: Date
    public updatedAt!: Date
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        company:{
            type: DataTypes.STRING(90),
            allowNull:false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'roles',
        modelName: 'role',
    }
)