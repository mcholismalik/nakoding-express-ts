const { SequelizeHelper } = require('sequelize-utility')
import { Sequelize } from 'sequelize'
import sequelize from '../connection'

import Users from './users'
import Tasks from './tasks'

const dbHelper = new SequelizeHelper([sequelize], Sequelize)

/**
 * Relation
 */
Users.hasMany(Tasks, { foreignKey: 'user_id' })
Tasks.belongsTo(Users, { foreignKey: 'user_id' })

/**
 * Sync the DB models
 */
// dbHelper.syncAllForce()

export { Users, Tasks }
export default dbHelper
