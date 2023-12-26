import { ObjectId } from 'mongodb'

interface InvoiceType {
  _id?: ObjectId
  user_id: string
  ticket_id: string
  status?: string
  date_of_invoice?: number
  created_at?: Date
  updated_at?: Date
}
export class Invoice {
  _id: ObjectId
  user_id: ObjectId
  ticket_id: ObjectId
  status: number
  date_of_invoice: number
  created_at: Date
  updated_at: Date
  constructor(invoice: InvoiceType) {
    this._id = invoice._id || new ObjectId()
    this.user_id = new ObjectId(invoice.user_id)
    this.ticket_id = new ObjectId(invoice.ticket_id)
    this.status = 0
    this.date_of_invoice = invoice.date_of_invoice || new Date().getTime()
    this.created_at = invoice.created_at || new Date()
    this.updated_at = invoice.updated_at || new Date()
  }
}
