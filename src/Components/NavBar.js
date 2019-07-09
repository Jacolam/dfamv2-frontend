import React from 'react'
// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class NavBar extends React.Component{

  signOut = () => {
    // clears token and redirects to login page
    localStorage.clear()
    window.location.replace(`http://localhost:3001/login`)
  }

  render(){
    // <Menu.Item>
    //   <Link to="/events">Events</Link><br/>
    // </Menu.Item>
    return(
      <Menu>
        <Menu.Item>
          <Link to="/main">Home</Link><br/>
        </Menu.Item>

        <Menu.Item>
          <Link to="/contacts">Contacts</Link><br/>
        </Menu.Item>


        <Menu.Item>
          <Link to="/search">Search</Link><br/>
        </Menu.Item>

        <Menu.Item>
          <Link to="/settings">Settings</Link><br/>
        </Menu.Item>

        <Menu.Item name='Sign Out' onClick={this.signOut} position='right'/>
      </Menu>
    )
  }
}

export default NavBar
