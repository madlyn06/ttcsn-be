import { NextFunction, Request, Response } from 'express'
import { ticketService } from '~/services/ticket.service'

export const createTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await ticketService.createTicket(req.body)
  return res.json({ message: 'Create ticket success', result })
}

export const getAllTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await ticketService.getAllTicket()
  return res.json({ message: 'Get ticket success', result })
}

export const getTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await ticketService.getTicket(req.params.id)
  return res.json({ message: 'Get ticket success', result })
}

export const updateTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await ticketService.updateTicket(req.params.id, req.body)
  return res.json({ message: 'Edit ticket success', result })
}

export const deleteTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await ticketService.deleteTicket(req.params.id)
  return res.json({ message: 'Delete ticket success', result })
}

export const SearchTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await ticketService.searchTicket(req.body)
  return res.json({ message: 'Search ticket success', result })
}
