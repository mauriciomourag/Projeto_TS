import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db";

interface IEmployee{
    id: number;
    name: string;
    email: string;
    salary: number;
    companyID: number;
    roleID: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export type EmployeeCreationAttributes = Optional<IEmployee, 'id'>;

export class Employee extends Model<IEmployee, EmployeeCreationAttributes> implements IEmployee{
    public id!: number
    public name!: string 
    public email!: string 
    public salary!: number
    public companyID!: number
    public roleID!: number
    public createdAt!: Date 
    public updatedAt!: Date 
}

Employee.init(
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

        salary: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },

        companyID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'companys',
                key: 'id'
            }
        },

        roleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
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
    },
    {
        sequelize,
        tableName: 'employees',
        modelName: 'employee',
    }
)