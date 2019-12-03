import { Model, DataTypes } from 'sequelize'
import sequelize from '../connection'

export default class Users extends Model {
  public id!: number
  public name!: string
  public phone_number!: string
  public is_active!: boolean
  public readonly created_at!: Date
  public readonly updated_at: Date
  public readonly deleted_at: Date
}

Users.init(
  {
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING(50),
    is_active: DataTypes.BOOLEAN,
  },
  {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'tbl_users',
    sequelize
  }
)