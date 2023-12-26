import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import { Invoice } from '~/models/schemas/Invoice.schema'
import { Ticket } from '~/models/schemas/Ticket.schema'
import { User } from '~/models/schemas/User.schema'

const uri = `mongodb+srv://manhhong:123456789a@test.pxyp0xt.mongodb.net/test`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('twitter-api')
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }

  get user(): Collection<User> {
    return this.db.collection('users')
  }
  get ticket(): Collection<Ticket> {
    return this.db.collection('tickets')
  }
  get invoice(): Collection<Invoice> {
    return this.db.collection('invoices')
  }
}
export const databaseService = new DatabaseService()
