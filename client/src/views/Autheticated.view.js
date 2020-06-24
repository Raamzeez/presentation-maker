import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import useStore from '../hooks/useStore'
import PresentationsOverviewView from './PresentationsOverview.view'
import PresentationsNewView from './PresentationsNew.view'

const AuthenticatedView = () => {
	const { authStore } = useStore()

	if (!authStore.authenticated) {
		return <Redirect to='/login' />
	}

	return (
		<Switch>
			<Route exact path='/presentations'>
				<PresentationsOverviewView />
			</Route>
            <Route exact path='/presentations/new'>
                <PresentationsNewView/>
            </Route>
		</Switch>
	)
}

export default AuthenticatedView
