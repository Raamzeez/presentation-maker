import mongoose, { Document, Schema } from 'mongoose'
import checkType from 'checktypes-js'
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Credentials } from '../modules/google_api'

interface IUserAccount {
	_id: string
	firstName: string
	lastName: string
	email: string
	password: string
	googleOAuthCredentials: Credentials
}

type IUserAccountDocument = IUserAccount & Document

export default class UserAccount implements IUserAccount {

	public _id: string
	public firstName: string
	public lastName: string
	public email: string
	public password: string
	public googleOAuthCredentials: Credentials

	static schema = {
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		googleOAuthCredentials: {
			refresh_token: String,
			expiry_date: Number,
			access_token: String,
			token_type: String,
			id_token: String,
			scope: String,
		},
	}

	constructor(userInfo: Partial<UserAccount>) {
		Object.assign(this, userInfo)
		// this.firstName = userInfo.firstName
		// this.lastName = userInfo.lastName
		// this.email = userInfo.email
		// this.password = userInfo.password
		// this.googleOAuthToken = userInfo.googleOAuthToken
		// this._id = userInfo._id
	}

	// isValid function check to see if UserAccount instance in valid
	isValid() {
		// we use spread operator ("...") to spread UserAccount.schema (in other words copy) to add all
		// properties inside schema into this new object for the purpose of adding a "$required" property
		// to specify required fields
		const [errs] = checkType(this, {
			...UserAccount.schema,
			$required: ['firstName', 'lastName', 'email', 'password'],
		})
		return errs
	}

	// register function will register user and put inside the database
	async register(): Promise<[this | null, Error | null]> {
		const foundAccount = await userDB.findOne({ email: this.email })
		console.log(foundAccount)
		if (foundAccount) {
			return [null, new Error('An account already exists with that email.')]
		}
		this.password = bcrypt.hashSync(this.password, 10)
		const registeredUser = await userDB.create(this)
		Object.assign(this, registeredUser)
		return [this, null]
	}

	static async login({ email, password }: { email: string, password: string}) {
        console.log(email, password)
		const foundUser = await userDB.findOne({ email })
		if (!foundUser) {
			return [null, new Error('A user with that email does not exist.')]
		}
		if (!bcrypt.compareSync(password, foundUser.password)) {
			return [null, new Error('Password is incorrect.')]
		}

        const payload = {
            sub: foundUser.id,
            iat: Date.now(),
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY || "")
        
		return [token, null]
	}

	async read(ID: string): Promise<Error | null> {
		try {
			const foundUser = await userDB.findById(ID)
			Object.assign(this, foundUser?.toObject())
			return null
		} catch (err) {
			return err
		}
	}

	async update(updateData: Partial<UserAccount>): Promise<Error | null> {
		try {
			const updatedPresentation = await userDB.findByIdAndUpdate(
				this._id,
				updateData,
				{ new: true }
			)
			Object.assign(this, updatedPresentation?.toObject())
			return null
		} catch (err) {
			return err
		}
	}
}

const userDB = mongoose.model<IUserAccountDocument>('user_account', new Schema(UserAccount.schema))
