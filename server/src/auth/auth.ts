import passportJWT from 'passport-jwt'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const secretKey = process.env.SECRET_KEY
// 12 hours
const validTime = 12 * 60 * 60 * 1000

export const strategy = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: secretKey,
	},
	async function (payload, done) {
		if (Date.now() > payload.iat + validTime) {
			return done({ expired: true }, false)
		}
		return done(null, payload)
	}
)

export const authenticator = function (req: Request, res: Response, next: NextFunction) {
	passport.authenticate('jwt', { session: false }, function (info, user, err) {

		if (err && err.expired)
			return res
				.status(401)
				.json({ type: 'TokenExpired', message: 'Auth token is expired.' })

		if (!user) {
			return res.status(400).json({
				type: 'BadRequest',
				message: 'There was something wrong with your request.',
			})
		}

		req.user = user
		return next()
	})(req, res, next)
}
