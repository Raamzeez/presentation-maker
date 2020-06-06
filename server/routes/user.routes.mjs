import express from 'express'
import { UserAccount } from '../modules/user.mjs'

const router = express.Router()

router.post('/', async (req, res) => {
	const newUser = new UserAccount(req.body)
	const errs = newUser.isValid()
	if (errs) {
		console.log("[POST /user/] - Validation errors:")
		console.table(errs)
		return res
			.status(422)
			.send(
				`UserAccount invalid properties: ${errs
					.map((e) => e.propertyName)
					.join(', ')}`
			)
	}
	const registeredUser = await newUser.register()
	return res.send(registeredUser)
})

export default router
