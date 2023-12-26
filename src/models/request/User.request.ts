import { UserRoles } from '~/constant/enum'

export interface RegisterReqBody {
  username: string
  email: string
  password: string
  role?: UserRoles
}

export interface TokenPayLoad {
  user_id: string
}
