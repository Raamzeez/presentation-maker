import express, { response } from 'express'
import qs from 'qs'
import UserAccount from '../modules/user'
import GoogleAPI from '../modules/google_api'

const router = express.Router()

router.get('/google-oauth-setup', (req, res) => {
	const g = new GoogleAPI()
	const url = g.generateAuthURL()
	return res.send(url)
})

router.post('/google-oauth-callback', async (req, res) => {
	const user = new UserAccount({ _id: (req.user as any).sub })
	const g = new GoogleAPI()
	const [tokenRes, err] = await g.getTokenFromCode(req.body.code)
	if (!tokenRes?.res) {
		return res.status(400).send({
			error: {
				name: 'Google Connection Failure',
				message: 'Could not connect to Google Server',
			},
		})
	}
	if (tokenRes.res.status !== 200) {
		return res.status(400).send({
			error: {
				name: 'Google Token Failure',
				message: 'Google did not respond with auth_token for unknown reason!',
				data: tokenRes.res.data,
			},
		})
	}

	const err2 = await user.update({ googleOAuthCredentials: tokenRes.tokens })
	if (err2) {
	return res.status(400).send({
		error: {
			name: 'Bad Request',
			message: 'Failed to update user with Google access_token!',
			data: err,
		},
	})
	}
	setTimeout(() => {
		res.status(200).send('OK')
	}, 800)
})

router.get('/google-oauth-check', async (req, res) => {
	const g = new GoogleAPI()
	const user = new UserAccount({})
	if (!req.user) {
		return res.status(401).send({
			error: {
				name: 'Not Authenticated',
				message: 'The user is not authenticated',
			},
		})
	}
	const err = await user.read(req.user?.sub)
	if (err) {
		console.error(err)
		return res.status(401).send({
			error: {
				name: 'User Not Found',
				message: 'Unable to find user in database',
			},
		})
	}
	g.setCredentials(user.googleOAuthCredentials)
	const [token, healthError] = await g.healthCheck()
	if (healthError) {
		console.error(healthError)
		return res.status(400).send({
			ok: false,
		})
	}
	return res.status(200).send({ ok: true })
})

export default router
