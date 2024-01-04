import { NextFunction, Request, Response } from 'express'
import { TokenPayLoad } from '~/models/request/User.request'
import { invoiceService } from '~/services/invoice.service'

export const createInvoiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const { ticket_id } = req.body
  const result = await invoiceService.createInvoice({ user_id, ticket_id })
  return res.json({ message: 'Create invoice success', result })
}
export const getAllInvoiceController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await invoiceService.getAllInvoice()
  return res.json({ message: 'Get all invoice success', result })
}

export const getAllMyTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_access_token as TokenPayLoad
  const result = await invoiceService.getAllMyTicket(user_id)
  return res.json({ message: 'Get all my ticket success', result })
}
export const confirmInvoiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await invoiceService.confirmInvoice(id)
  return res.json({ message: 'Confirm invoice success', result })
}
