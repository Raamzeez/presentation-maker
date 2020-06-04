import mongoose from 'mongoose'
import checkType from 'checktypes-js'

export class UserAccount {
    static schema = {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        googleOAuthToken: String,
    }

    constructor(userInfo){
        Object.assign(this, userInfo)
    }

    // isValid function check to see if UserAccount instance in valid
    isValid(){
        // we use spread operator ("...") to spread UserAccount.schema (in other words copy) to add all 
        // properties inside schema into this new object for the purpose of adding a "$required" property 
        // to specify required fields
        const [errs] = checkType(this, {
            ...UserAccount.schema,
            $required: ["firstName", "lastName", "email", "password"]
        })
        return errs
    }

    // register function will register user and put inside the database
    async register(){
        const registeredUser = await userDB.create(this)
        Object.assign(this, registeredUser._doc)
        return this
    }
}


const userDB = mongoose.model('user_account', UserAccount.schema);