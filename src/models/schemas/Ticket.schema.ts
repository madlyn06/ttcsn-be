import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'

interface TicketType {
  _id?: ObjectId
  departure: string
  destination: string
  quantity: number
  price: string
  date: number
  created_at?: Date
  updated_at?: Date
}
export class Ticket {
  _id: ObjectId
  departure: string
  destination: string
  quantity: number
  price: string
  date: number
  created_at: Date
  updated_at: Date
  constructor(ticket: TicketType) {
    this._id = ticket._id || new ObjectId()
    this.departure = ticket.departure
    this.destination = ticket.destination
    this.quantity = ticket.quantity
    this.price = ticket.price
    this.date = ticket.date || new Date().getTime()
    this.created_at = ticket.created_at || new Date()
    this.updated_at = ticket.updated_at || new Date()
  }
}
