import express, { NextFunction, Request, Response } from 'express'
import { databaseService } from './services/databases.service'
import usersRouter from './routes/user.route'
import { ErrorWithMessage } from './models/Error'
import ticketRouter from './routes/ticket.route'
import cors from 'cors'
import invoiceRoute from './routes/invoice.route'

const app = express()
const port = 8080
databaseService.connect().catch(console.dir)
app.use(
  cors({
    origin: '*'
  })
)
app.use(express.json())
app.use('/users', usersRouter)
app.use('/tickets', ticketRouter)
app.use('/invoices', invoiceRoute)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithMessage) {
    return res.status(err.status).json(err)
  }
  res.status(500).json({
    message: err.message,
    errorInfo: err
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
