import React from 'react'
import auth from '../auth/auth'
import { Redirect } from 'react-router-dom'

const AuthenticatedView = () => {

    const isAuthenticated =  auth.isAuthenticated()

    if (!isAuthenticated){
        return <Redirect to="/login"/>
    }

    return (
        <div>
            AuthenticatedView
        </div>
    )
}

export default AuthenticatedView