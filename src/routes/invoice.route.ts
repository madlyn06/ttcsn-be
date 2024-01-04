import { Router } from 'express'
import {
  confirmInvoiceController,
  createInvoiceController,
  getAllInvoiceController,
  getAllMyTicketController
} from '~/controllers/invoice.controller'
import {
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

const invoiceRoute = Router()

// create ticket
invoiceRoute.post('/', accessTokenValidator, wrapRequestHandler(createInvoiceController))
// get ticket
invoiceRoute.get('/', wrapRequestHandler(getAllInvoiceController))
// get ticket by id
// edit ticket
invoiceRoute.put('/:id', wrapRequestHandler(confirmInvoiceController))
// delete ticket
invoiceRoute.get('/my-ticket', accessTokenValidator, wrapRequestHandler(getAllMyTicketController))
export default invoiceRoute
