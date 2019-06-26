import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavBar extends React.Component{

  signOut = () => {
    // clears token and redirects to login page
    localStorage.clear()
    window.location.replace(`http://localhost:3001/login`)
  }

  render(){
    return(
      <div>
        NavBar Container
        <ul>
          <Link to="/main">Home</Link><br/>
          <Link to="/contacts">Contacts</Link><br/>
          <Link to="/events">Events</Link><br/>
        </ul>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    )
  }
}

export default NavBar
