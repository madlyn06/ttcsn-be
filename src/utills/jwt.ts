import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayLoad } from '~/models/request/User.request'
// import { TokenPayLoad } from '~/models/request/Users.request'

export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, rejects) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        rejects(err)
      }
      resolve(token as string)
    })
  })
}
export const verifyToken = ({ token, privateKey }: { token: string; privateKey: string }) => {
  return new Promise<TokenPayLoad>((resolve, rejects) => {
    jwt.verify(token, privateKey, (err: any, decoded: any) => {
      if (err) {
        rejects(err)
      }
      resolve(decoded)
    })
  })
}
