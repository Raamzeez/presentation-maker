import React from 'react'
import useStore from '../hooks/useStore'
import { Redirect } from 'react-router-dom'

const LogoutView = () => {

    const {authStore} = useStore()
    authStore.logout()

    return <Redirect to="/login" />
}

export default LogoutView