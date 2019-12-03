import { Router } from 'express'
import { createValidator } from 'express-joi-validation'
import { User } from './controllers/userController'
import { userGetSchema, userInsertSchema, userUpdateSchema } from './schemas/userSchemas'

const router = Router()
const validator = createValidator({ passError: true })
const user = new User()

router.get('/user', validator.query(userGetSchema), user.get)
router.post('/user', validator.body(userInsertSchema), user.insert)
router.put('/user', validator.query(userUpdateSchema), user.update)

module.exports = router
