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
	const tokenRes = await g.getTokenFromCode(req.body.code)
	if (tokenRes.res.status !== 200) {
		return res.status(400).send({
			error: {
				name: 'Google Token Failure',
				message: 'Google did not respond with auth_token for unknown reason!',
				data: tokenRes.res.data,
			},
		})
	}
	console.log('google access_token returned: ', tokenRes.tokens)
	const err = await user.update({ googleOAuthToken: tokenRes.tokens })
	if (err) {
		return res.status(400).send({
			error: {
				name: 'Bad Request',
				message: 'Failed to update user with Google access_token!',
				data: err,
			},
		})
	}
	res.send('OK')
})

export default router
