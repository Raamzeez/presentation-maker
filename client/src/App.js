import React from 'react';
import axios from 'axios'
import './App.css';

class App extends React.Component {

  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    link: '',
    result: ''
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event){
    console.log('Link being sent from server: ' + this.state.link)
    event.preventDefault()
    axios.get('http://localhost:5000/', {
      params: {
        link: this.state.link
      }
    })
    .then(response => {
      console.log(response.data)
      this.setState({result: response.data})
    })
    .catch(function (error) {
      console.error(error);
    })
  }

  render(){
    return (
    <div className="App">
      <form action='http://localhost:5000/' onSubmit={this.handleSubmit}>
        <h1>Enter URL for Wikipedia Page: </h1>
        <input size="50" type="text" name="link" onChange={this.handleChange}/><input style={{marginLeft: "20px"}} type="submit" />
      </form>
      <br />
      <br />
      {/* <div>{this.state.result}</div> */}
    </div>
  )};
}

export default App;
