import { Invoice } from '~/models/schemas/Invoice.schema'
import { databaseService } from './databases.service'
import { ObjectId } from 'mongodb'

class InvoiceService {
  async createInvoice(invoice: any) {
    const { user_id, ticket_id } = invoice
    const result = await databaseService.invoice.insertOne(
      new Invoice({
        user_id,
        ticket_id
      })
    )
    return result
  }

  async getAllInvoice() {
    const result = await databaseService.invoice
      .aggregate([
        {
          $match: {}
        },
        {
          $lookup: {
            from: 'tickets',
            localField: 'ticket_id',
            foreignField: '_id',
            as: 'tickets'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'users'
          }
        }
      ])
      .toArray()
    return result
  }
  async confirmInvoice(id: string) {
    const result = await databaseService.invoice.updateOne({ _id: new ObjectId(id) }, { $set: { status: 1 } })
    return result
  }
  async getAllMyTicket(user_id: string) {
    const result = await databaseService.invoice
      .aggregate([
        {
          $match: {}
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_id'
          }
        },
        {
          $match: {
            user_id: {
              $elemMatch: {
                _id: new ObjectId(user_id)
              }
            }
          }
        },
        {
          $lookup: {
            from: 'tickets',
            localField: 'ticket_id',
            foreignField: '_id',
            as: 'ticket'
          }
        }
      ])
      .toArray()

    return result
  }
}
export const invoiceService = new InvoiceService()
