import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import api from '../api'

const HomeView = () => {

	const [state, setState] = useState({
		googleTokenChecked: false,
		googleTokenValid: false
	})

	const healthCheck = async () => {
		const resp = await api.get('/user/google-oauth-check')
		setState({googleTokenChecked: true, googleTokenValid: resp.data.ok})
	}

	useEffect(() => {
		healthCheck()
	}, [])

	if (state.googleTokenChecked === true && state.googleTokenValid === false){
		return (
			<Redirect to='/google-setup' />
		)
	}

	return (
		<div>
			Home View
		</div>
	)}
export default HomeView
