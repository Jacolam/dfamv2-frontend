import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import MainDisplay from '../Components/MainDisplay.js'
import hasToken from '../hasToken.js'

class HomeContainer extends React.Component{

  componentDidMount(){
    // if (!localStorage.token){
    //   // if the user does not have a token, redirect to Log In
    //   window.location.replace(`http://localhost:3001/login`)
    // } refactored into hasToken
    hasToken()
    fetch('http://localhost:3000/api/v1/contacts', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(contacts => {
    console.log(contacts)
    this.props.getContacts(contacts)
    })
  }

  render(){
    return(
      <div>
      Home Page
      <NavBar/>
      <MainDisplay/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: (contacts) => dispatch({type:'GET_CONTACTS',contacts})
  }
}
const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
