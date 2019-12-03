import * as Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema, ValidatedRequest } from 'express-joi-validation'

export const userGetSchema = Joi.object({
  id: Joi.number().required(),
})
export interface IUserGetSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    id: number
  }
}

export const userInsertSchema = Joi.object({
  name: Joi.string().required(),
  phone_number: Joi.string().trim().regex(/^[0-9]+$/).max(13).required(),
  is_active: Joi.boolean().required()
})
export interface IUserInsertSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string
    phone_number: string
    is_active: boolean
  }
}

export const userUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  phone_number: Joi.string().trim().regex(/^[0-9]+$/).max(13),
  is_active: Joi.boolean()
})
export interface IUserUpdateSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string
    name?: string
    phone_number?: string
    is_active?: boolean
  }
}

