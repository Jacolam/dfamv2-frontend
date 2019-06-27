import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import hasToken from '../hasToken.js'


class EventsPage extends React.Component{

  componentDidMount(){
    hasToken()
  }

  render(){
    return(
      <div>
      Local Events Page
      <NavBar/>
      </div>
    )
  }
}

export default connect()(EventsPage)
