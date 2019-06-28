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
        indiv profile
        <NavBar/>
      this should show indiv profile of the user that we clicked
      </div>
    )
  }
}

export default connect()(ContactPage)
