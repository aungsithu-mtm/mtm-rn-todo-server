import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { EnhancedRequest } from '../domain/model/enhancedRequest'

const isAuth = (req: EnhancedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }
  type DecodedToken = {
    userId: string
    email: string
  }
  let decodedToken: DecodedToken
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedToken
  } catch (err) {
    req.isAuth = false
    return next()
  }
  if (!decodedToken) {
    req.isAuth = false
    return next()
  }
  req.isAuth = true
  req.userId = decodedToken.userId
  req.email = decodedToken.email ? decodedToken.email : ""

  next()
}
export default isAuth