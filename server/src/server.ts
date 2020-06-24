import dotenv from 'dotenv'
dotenv.config()
import express, {NextFunction} from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { strategy, authenticator } from './auth/auth'
import passport from 'passport'

// Route Imports
import userRoutes from './routes/user.routes'
import presentationRoutes from './routes/presentation.routes'
import unauthenticatedRoutes from './routes/unauthenticated.routes'

const PORT = 5000
const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

passport.use(strategy)
app.use(passport.initialize())

app.use('/api', unauthenticatedRoutes)

app.use('/api', authenticator)
app.use('/api/user', userRoutes)
app.use('/api/presentation', presentationRoutes)

mongoose.connect(
	'mongodb://localhost/presentation_maker_db',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			throw new Error(`could not connect to mongodb: ${err}`)
		}
		console.log('Connected to MongoDB..')
	}
)

app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`))
