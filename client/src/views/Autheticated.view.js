import React from 'react'
import { Redirect } from 'react-router-dom'
import useStore from '../hooks/useStore'

const AuthenticatedView = () => {
    const { authStore } = useStore()
    const isAuthenticated =  authStore.isAuthenticated()

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