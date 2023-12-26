import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'
import { ErrorWithMessage } from '~/models/Error'
import { TokenPayLoad } from '~/models/request/User.request'
import { databaseService } from '~/services/databases.service'

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const user = await databaseService.user.findOne({ _id: new ObjectId(user_id) })
  if (user?.role === UserRoles.User) {
    return next(
      new ErrorWithMessage({
        status: 401,
        message: 'Unauthorized'
      })
    )
  }
  next()
}
