import { RegisterReqBody } from '~/models/request/User.request'
import { databaseService } from './databases.service'
import { ObjectId } from 'mongodb'
import { User } from '~/models/schemas/User.schema'
import { signToken } from '~/utills/jwt'

class UsersService {
  async checkEmailExist(email: string) {
    const result = await databaseService.user.findOne({ email })
    return Boolean(result)
  }
  private signAccessToken({ user_id }: { user_id: string }) {
    return signToken({
      payload: { user_id },
      options: { expiresIn: '7d' },
      privateKey: '12344321!@#123!@#'
    })
  }
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId().toString()
    await databaseService.user.insertOne(
      new User({
        ...payload,
        _id: new ObjectId(user_id)
      })
    )
    const user = await databaseService.user.findOne({ _id: new ObjectId(user_id) })
    const access_token = await this.signAccessToken({ user_id })
    return { access_token, user }
  }
  async login({ user_id }: { user_id: string }) {
    const access_token = await this.signAccessToken({ user_id })
    return { access_token }
  }

  async getAllUser() {
    return await databaseService.user.find().toArray()
  }

  async updateUser(id: string, payload: Omit<RegisterReqBody, 'email' | 'username'>) {
    return await databaseService.user.updateOne({ _id: new ObjectId(id) }, { $set: payload })
  }

  async getUserById(id: string) {
    return await databaseService.user.findOne({ _id: new ObjectId(id) })
  }

  async deleteUser(id: string) {
    return await databaseService.user.deleteOne({ _id: new ObjectId(id) })
  }
}

export const usersService = new UsersService()
