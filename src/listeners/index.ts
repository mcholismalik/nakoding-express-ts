import seeds from '../database/seeds'

export default (): Promise<any> => {
  return new Promise<any>(async (res, rej) => {
    try {
      await seeds()
    } catch (err) {
      rej(err)
    }
  })
}