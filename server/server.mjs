import { getBullets } from './modules/presentation_maker.mjs'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { UserAccount } from './modules/user.mjs'

const PORT = 5000
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
	const bullets = await getBullets(req.query.link)
	res.send(bullets)
})

app.post('/user', async (req,res) =>{
	const newUser = new UserAccount(req.body)
	const errs = newUser.isValid()
	if (errs) {
		return res.send(`UserAccount invalid properties: ${errs.map(e => e.propertyName).join(", ")}`)
	}
	const registeredUser = await newUser.register()
	return res.send(registeredUser)
})

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
