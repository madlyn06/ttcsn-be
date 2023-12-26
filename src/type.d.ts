import { TokenPayLoad } from './models/request/User.request'
import { User } from './models/schemas/User.schema'

declare module 'express' {
  interface Request {
    user?: User
    decoded_access_token?: TokenPayLoad
  }
}
