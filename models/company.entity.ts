import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../db";

interface ICompany{
    id: number;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export type CompanyCreationAttributes = Optional<ICompany, 'id'>;

export class Company extends Model<ICompany, CompanyCreationAttributes> implements ICompany{
    public id!: number
    public title!: string
    public createdAt!: Date
    public updatedAt!: Date
}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(60),
            allowNull: false,
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
        tableName: 'companys',
        modelName: 'company',
    }
)