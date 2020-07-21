import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import useStore from '../hooks/useStore'
import PresentationsOverviewView from './PresentationsOverview.view'
import PresentationsNewView from './PresentationsNew.view'
import GoogleOAuthCallbackView from './GoogleOAuthCallback.view'
import GoogleOAuthSetupView from './GoogleOAuthSetup.view'
import HomeView from './Home.view'

const AuthenticatedView =  () => {
	const { authStore } = useStore()

	if (!authStore.authenticated) {
		return <Redirect to='/login' />
	}

	return (
		<Switch>
			<Route exact path="/">
				<HomeView />
			</Route>
			<Route exact path='/google-setup'>
				<GoogleOAuthSetupView />
			</Route>
			<Route exact path='/presentations'>
				<PresentationsOverviewView />
			</Route>
			<Route exact path='/presentations/new'>
				<PresentationsNewView />
			</Route>
			<Route exact path='/google-oauth-callback'>
				<GoogleOAuthCallbackView />
			</Route>
		</Switch>
	)
}

export default AuthenticatedView
