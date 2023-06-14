import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes

app.use('/api/v1/users/', userRouter)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully')
//   // throw new ApiError(400, 'Got An Error')
//   next('Got an error') // Error
// })

//Global eror handeler
app.use(globalErrorHandler)

export default app
