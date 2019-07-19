import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class SignUpPage extends React.Component{

  state={
    username:'',
    password:''
  }

  //saving changes to local state
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
      //will push user to login page after creating]
      if (!!data.error){
        alert('Account already exists')
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
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            Create an Account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='Username'
                name='username'
                onChange={this.handleChange}
                />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={this.handleChange}
              />

            <Button color='blue' fluid size='large'>
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to='/login'> Already have an account? </Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignUpPage
