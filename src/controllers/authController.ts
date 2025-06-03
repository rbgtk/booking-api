import jsonwebtoken from 'jsonwebtoken'
import { Request, Response } from 'express'

// POST /api/auth/login
export function login(req: Request, res: Response) {
  // check email+password
  //    200: return token
  //    401: unauthorized
}

// DELETE /api/auth/login
export function logout(req: Request, res: Response) {
  // invalidate token
  //    200: return home
}
