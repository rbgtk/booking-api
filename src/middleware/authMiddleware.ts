import jsonwebtoken from 'jsonwebtoken'
import { Request, Response } from 'express'

export function verifyToken(
  req: Request,
  res: Response,
  next: CallableFuntion
) {
  next()
}
