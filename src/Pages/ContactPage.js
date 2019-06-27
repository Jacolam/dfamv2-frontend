import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import hasToken from '../hasToken.js'


class ContactPage extends React.Component{

  componentDidMount(){
    hasToken()
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
