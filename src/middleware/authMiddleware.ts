import { Response, Request, NextFunction } from 'express'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next()
  // const header = req.headers
  // if (!header.uid) {
  //   res.status(400).json({
  //     status: false,
  //     flag: 'INVALID_HEADER',
  //     message: 'Invalid header request. try again'
  //   })
  // } else {
  //   next()
  // }
}
