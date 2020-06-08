import { createContext } from 'react'
import AuthStore from '../auth/auth'

const storeContext = createContext({
    authStore: new AuthStore(),
})

export default storeContext
