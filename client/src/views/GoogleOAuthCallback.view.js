import React, {useEffect} from 'react'
import qs from 'qs'
import { useLocation } from 'react-router-dom'
import api from '../api'

const GoogleOAuthCallbackView = () => {
	const location = useLocation()
	const queryData = qs.parse(location.search, { ignoreQueryPrefix: true })
	console.log('queryData: ', queryData)
	useEffect(() => {
		;(async () => {
			const resp = await api.post('/user/google-oauth-callback', {
				code: queryData.code,
			})
			console.log('resp: ', resp)
		})()
	}, [])
	return <div>Working...</div>
}

export default GoogleOAuthCallbackView
