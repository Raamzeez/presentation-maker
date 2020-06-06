import React, { useState } from 'react'
import api from '../api'

const HomeView = () => {

    const [state, setState] = useState({
        link: ""
    })

	const handleChange = (e) => {
		setState({ [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const resp = await api.get('http://localhost:5000/', {
                params: {
                    link: state.link,
                },
            })
        } catch (err) {
            alert(`Could not send GET request: ${err}`)
        }

	}

	return (
		<div className='App'>
			<form action='http://localhost:5000/' onSubmit={handleSubmit}>
				<h1>Enter URL for Wikipedia Page: </h1>
				<input size='50' type='text' name='link' onChange={handleChange} value={state.link}/>
				<input style={{ marginLeft: '20px' }} type='submit' />
			</form>
			<br />
			<br />
			{/* <div>{this.state.result}</div> */}
		</div>
	)
}

export default HomeView
