import faker from 'faker'
import debug from '../../utils/debugger'
import { Tasks } from '../models'

const { debugDB } = debug
const createdData: Tasks[] = []
const size: number = 4
export default (user_id: number): Promise<Tasks[]> =>
  new Promise<Tasks[]>(async (res, rej) => {
    for (const i of Array(size)) {
      const data: Tasks = await Tasks.create<Tasks>({
        user_id,
        task: `Task name`,
        description: faker.lorem.text(3)
      })
      createdData.push(data)
    }
    debugDB(`Seed Tasks created: ${size}`)
    res(createdData)
  })
