import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class LogInPage extends React.Component{

  state={
    username:'',
    password:''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (!!data.message){
        alert('wrong information')
        //MORE DESCRIPTIVE ERRORS
      } else {
        localStorage.setItem('current_user', data.user.username)
        localStorage.setItem('token', data.jwt)
        window.location.replace(`http://localhost:3001/main`)
      }


    })
  }

  render(){
    return(
      <div>
      Welcome to D-FAM
      <br/>
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
        <br/>
        <button type='submit'>Submit</button>
      </form>
      <Link to='/signup'> Don't have an account? </Link>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: () => dispatch({ type:'LOG_IN' })
  }
}

export default connect(null,mapDispatchToProps)(LogInPage)
