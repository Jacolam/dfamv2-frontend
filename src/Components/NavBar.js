import React from 'react'
// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

class NavBar extends React.Component{

  signOut = () => {
    // clears token and redirects to login page
    localStorage.clear()
    window.location.replace(`http://dfam.herokuapp.com/login`)
  }

  render(){
    return(
      <Menu color='blue' inverted>
        <Menu.Item>
          <Link to="/main">
            Home
            <Icon name='home'/>
          </Link><br/>
        </Menu.Item>

        <Menu.Item>
          <Link to="/contacts">
            <Icon name='address book' size='large'/>
          </Link><br/>
        </Menu.Item>

        <Menu.Item>
          <Link to="/search">
            <Icon name="search" size="large"/>
          </Link><br/>
        </Menu.Item>

        <Menu.Item>
          <Link to="/settings">
            <Icon name='settings' size='large'/>
          </Link><br/>
        </Menu.Item>

        <Menu.Item name='Sign Out' onClick={this.signOut} position='right'>
          Sign Out<Icon name='log out' />
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavBar
