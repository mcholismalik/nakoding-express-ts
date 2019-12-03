import { Response } from 'express'
import { ValidatedRequest } from 'express-joi-validation'
import response from '../../../utils/response'
import { flag } from '../../../utils/flag'
import debug from './../../../utils/debugger'
import { Users, Tasks } from '../../../database/models'
import { IUserInsertSchema, IUserUpdateSchema, IUserGetSchema } from '../schemas/userSchemas'

const { debugError } = debug
export class User {
  /**
   * Facade => Get User Task By Pk
   * @param {number} id 
   */
  public async getUserTaskByPk(id: number) {
    try {
      return await Users.findByPk<Users>(id, {
        include: [{
          model: Tasks
        }]
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * Handler Router => Get
   * @param {*} req
   * @param {*} res
   */
  get = async (req: ValidatedRequest<IUserGetSchema>, res: Response) => {
    try {
      const data = await this.getUserTaskByPk(req.query.id)
      return response.success(`Get user by id success`, res, data)
    } catch (err) {
      debugError(err)
      response.error('Internal server error', res, flag.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Handler Router => Insert
   * @param {*} req
   * @param {*} res
   */
  insert = async (req: ValidatedRequest<IUserInsertSchema>, res: Response) => {
    try {
      const data = await Users.create<Users>(req.body)
      return response.success(`Insert user success`, res, data)
    } catch (err) {
      debugError(err)
      response.error('Internal server error', res, flag.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Handler Router => Update
   * @param {*} req
   * @param {*} res
   */
  update = async (req: ValidatedRequest<IUserUpdateSchema>, res: Response) => {
    try {
      const { id, ...dataUpdate } = req.body
      const data = await Users.update<Users>(dataUpdate, {
        where: { id },
        returning: true
      })
      return response.success(`Update user by id success`, res, data)
    } catch (err) {
      debugError(err)
      response.error('Internal server error', res, flag.INTERNAL_SERVER_ERROR)
    }
  }
}
