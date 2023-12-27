import { ObjectId } from 'mongodb'
import { UserRoles } from '~/constant/enum'

interface TicketType {
  _id?: ObjectId
  departure: string
  destination: string
  departure_time: string
  destination_time: string
  price: string
  date: number
  created_at?: Date
  updated_at?: Date
}
export class Ticket {
  _id: ObjectId
  departure_time: string
  destination_time: string
  departure: string
  destination: string
  price: string
  date: number
  created_at: Date
  updated_at: Date
  constructor(ticket: TicketType) {
    this._id = ticket._id || new ObjectId()
    this.departure_time = ticket.departure_time
    this.destination_time = ticket.destination_time
    this.departure = ticket.departure
    this.destination = ticket.destination
    this.price = ticket.price
    this.date = ticket.date || new Date().getTime()
    this.created_at = ticket.created_at || new Date()
    this.updated_at = ticket.updated_at || new Date()
  }
}
