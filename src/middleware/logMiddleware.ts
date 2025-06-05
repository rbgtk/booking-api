import { Request, Response, NextFunction } from 'express'

function printDate() {
  const date = new Date()
  const hour = date.getHours()
  const mins = date.getMinutes()
  const secs = date.getSeconds()
  const mils = date.getMilliseconds()

  return `${hour}:${mins}:${secs}.${mils}`
}

export async function logRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`[${printDate()}] ${req.method} request from ${req.ip} to ${req.path}`)
  next()
}
