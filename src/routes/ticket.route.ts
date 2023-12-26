import { Router } from 'express'
import {
  SearchTicketController,
  createTicketController,
  deleteTicketController,
  getAllTicketController,
  getTicketController,
  updateTicketController
} from '~/controllers/ticket.controller'
import { loginController, registerController } from '~/controllers/user.controller'
import { isAdmin } from '~/middlewares/ticket.middleware'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/user.middleware'
import { wrapRequestHandler } from '~/utills/handlers'

const ticketRouter = Router()

// create ticket
ticketRouter.post('/', wrapRequestHandler(createTicketController))
// get ticket
ticketRouter.get('/', wrapRequestHandler(getAllTicketController))
// get ticket by id
ticketRouter.get('/:id', wrapRequestHandler(getTicketController))
// edit ticket
ticketRouter.put('/:id', wrapRequestHandler(updateTicketController))
// delete ticket
ticketRouter.delete('/:id', wrapRequestHandler(deleteTicketController))
ticketRouter.post('/search', wrapRequestHandler(SearchTicketController))

export default ticketRouter
