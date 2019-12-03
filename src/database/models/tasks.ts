import { Model, DataTypes } from 'sequelize'
import sequelize from '../connection'

export default class Tasks extends Model {
  public id!: number
  public user_id!: number
  public task!: string
  public description!: string
  public readonly created_at!: Date
  public readonly updated_at: Date
  public readonly deleted_at: Date
}

Tasks.init(
  {
    user_id: DataTypes.INTEGER,
    task: DataTypes.STRING(50),
    description: DataTypes.TEXT
  },
  {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'tbl_tasks',
    sequelize
  }
)