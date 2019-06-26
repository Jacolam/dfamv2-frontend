import React from 'react'
import { Link } from 'react-router-dom'

class SignUpPage extends React.Component{

  state={
    username:'',
    password:''
  }

  //saving changes to local state
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, ()=>console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      //will push user to login page after creating
      window.location.replace(`http://localhost:3001/login`)
      // ADD ERROR MEESAGE IF FAILS TO CREATE
      // AUTO SIGN IN AFTER SIGNING UP

    })
  }

  render(){
    return(
      <div>
        Create An Account
        <form onSubmit={this.handleSubmit}>
          Username
            <input
              type='text'
              name='username'
              onChange={this.handleChange}
            />
            <br/>
          Password
            <input
              type='password'
              name='password'
              onChange={this.handleChange}
            />
            <button type='submit'>Submit</button>
        </form>

        <Link to='/login'> Already have an account? </Link>
      </div>
    )
  }
}

export default SignUpPage
