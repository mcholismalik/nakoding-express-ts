import dbHelper, * as models from '../models'
import debug from '../../utils/debugger'

import seedTasks from './tasks'
import seedUsers from './users'

const { debugDB } = debug

export default (): void => {
  dbHelper.syncAllForce().then(async () => {
    try {
      const dataUsers: models.Users[] = await seedUsers()
      await Promise.all(dataUsers.map(async (v, i) => {
        await seedTasks(v.id)
      }))
    } catch (err) {
      debugDB('Seeds error')
    }
  })
}
