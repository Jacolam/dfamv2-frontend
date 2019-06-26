import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'

class ContactsPage extends React.Component{

  componentDidMount(){
    if (!localStorage.token){
      // if the user already has a token, redirect to homepage
      window.location.replace(`http://localhost:3001/login`)
    }
  }

  render(){
    return(
      <div>
      Contacts Page

      <NavBar/>
      </div>
    )
  }
}

export default connect()(ContactsPage)
