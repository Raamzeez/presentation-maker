import mongoose, { Document, Schema} from 'mongoose'
import checkType from 'checktypes-js'
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'

interface IPresentation {
    _id: string
    wikiLink: string
    name: string
    createdAt: Date
    userID: string
}

type IPresentationDocument = IPresentation & Document

export default class Presentation implements IPresentation {

    public _id: string
	public wikiLink: string
	public name: string
    public createdAt: Date
    public userID: string

	static schema = {
		wikiLink: String,
		name: String,
        createdAt: Date,
        userID: String
    }

	constructor(presentationInfo: Partial<IPresentation>) {
        Object.assign(this, presentationInfo)
	}

	// isValid function check to see if Presentation instance in valid
	isValid() {
		const [errs] = checkType(this, {
			...Presentation.schema,
			$required: ['wikiLink', 'name'],
		})
		return errs
    }    
    
    async create(): Promise<[string, Error | null]> {
        try {
            const newPresentation = await presentationsDB.create(this)
            this._id = newPresentation.id
            return [this._id, null]
        } catch (err) {
            return ['', err]
        }
    }

    async read(ID: string): Promise<Error | null> {
        try {
            const foundPresentation = await presentationsDB.findById(ID)
            Object.assign(this, foundPresentation?.toObject())
            return null
        } catch(err){
            return err
        }
    }

    async update(updateData: Partial<IPresentation>): Promise<Error | null> {
        try {
            const updatedPresentation = await presentationsDB.findByIdAndUpdate(this._id, updateData, { new: true })
            Object.assign(this, updatedPresentation?.toObject())
            return null
        } catch (err){
            return err
        }
    }

    async delete(): Promise<Error | null> {
        try {
            await presentationsDB.findByIdAndRemove(this._id)
            return null
        } catch (err){
            return err
        }
    }

    static async readAll(): Promise<[IPresentation[], Error | null]>{
        try {
            const presentations = await presentationsDB.find()
            return [presentations, null]
        } catch(err) {
            return [[], err]
        }
    }

}

const presentationsDB = mongoose.model<IPresentationDocument>('presentations', new Schema(Presentation.schema))

