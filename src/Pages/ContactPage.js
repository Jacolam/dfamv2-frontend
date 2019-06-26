import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'

class ContactPage extends React.Component{

  componentDidMount(){
    if (!localStorage.token){
      // if the user already has a token, redirect to homepage
      window.location.replace(`http://localhost:3001/login`)
    }
  }

  render(){
    return(
      <div>
        <NavBar/>
         {this.renderContacts()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ContactPage)
