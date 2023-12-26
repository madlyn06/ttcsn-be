import { Router } from 'express'
import {
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  loginController,
  registerController,
  updateUserController
} from '~/controllers/user.controller'
import { isAdmin } from '~/middlewares/ticket.middleware'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

usersRouter.get('/', wrapRequestHandler(getAllUserController))

usersRouter.get('/:id', wrapRequestHandler(getUserByIdController))

usersRouter.put('/:id', accessTokenValidator, isAdmin, wrapRequestHandler(updateUserController))

usersRouter.delete('/:id', accessTokenValidator, isAdmin, wrapRequestHandler(deleteUserController))
export default usersRouter
