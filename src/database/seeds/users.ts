import faker from 'faker'
import debug from '../../utils/debugger'
import { Users } from '../models'

const { debugDB } = debug
const createdData: Users[] = []
const size: number = 4
export default (): Promise<Users[]> =>
  new Promise<Users[]>(async (res, rej) => {
    for (const i of Array(size)) {
      const data: Users = await Users.create<Users>({
        name: faker.name.findName(),
        phone_number: faker.phone.phoneNumber('081#########'),
        is_active: faker.random.boolean()
      })
      createdData.push(data)
    }
    debugDB(`Seed Users created: ${size}`)
    res(createdData)
  })
