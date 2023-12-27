import { Ticket } from '~/models/schemas/Ticket.schema'
import { databaseService } from './databases.service'
import { TicketReqBody } from '~/models/request/Ticket.request'
import { ObjectId } from 'mongodb'
import { ErrorWithMessage } from '~/models/Error'

class TicketService {
  async createTicket(payload: TicketReqBody) {
    const result = await databaseService.ticket.insertOne(
      new Ticket({
        ...payload,
        date: new Date(payload.date)
      })
    )
    return { result }
  }
  async getAllTicket() {
    const result = await databaseService.ticket.find().toArray()
    return result
  }

  async getTicket(id: string) {
    const result = await databaseService.ticket.findOne({ _id: new ObjectId(id) })
    if (result === null) {
      throw new ErrorWithMessage({
        status: 404,
        message: 'Ticket not found'
      })
    }
    return result
  }

  async updateTicket(id: string, payload: TicketReqBody) {
    const result = await databaseService.ticket.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          date: new Date(payload.date)
        }
      }
    )
    return result
  }
  async deleteTicket(id: string) {
    const result = await databaseService.ticket.deleteOne({ _id: new ObjectId(id) })
    return result
  }

  async searchTicket(payload: any) {
    const { departure, destination, date } = payload
    const result = await databaseService.ticket
      .aggregate([
        {
          $match: {
            departure: departure,
            destination: destination,
            date: date
          }
        }
      ])
      .toArray()
    return result
  }
}

export const ticketService = new TicketService()
