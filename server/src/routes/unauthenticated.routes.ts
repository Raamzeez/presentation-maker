import express from 'express'
import UserAccount from '../modules/user'

const router = express.Router()

router.post('/user/', async (req, res) => {
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
	const [registeredUser, err] = await newUser.register()
	console.log(registeredUser)
	console.log(err)
	if (err){
		return res.status(400).send({
			error: {
				errorName: "Registration Error",
				errorMessage: err.message
			}
		})
	}
	return res.send(registeredUser)
})

router.post('/user/login', async (req, res) => {
	console.log(req.body)
	const [token, err] = await UserAccount.login(req.body)
	if (err) {
		return res.status(401).send({
			error: {
				errorName: "Failed Authentication",
				errorMessage: "Could not login user."
			}
		})
	}
	return res.send({
		token
	})

})

export default router
