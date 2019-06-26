import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import MainDisplay from '../Components/MainDisplay.js'
import loggedIn from '../loggedIn.js'

class HomeContainer extends React.Component{

  componentDidMount(){
    loggedIn()
    // if (!localStorage.token){
    //   // if the user does not have a token, redirect to Log In
    //   window.location.replace(`http://localhost:3001/login`)
    // }
    fetch('http://localhost:3000/api/v1/contacts', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(contacts => {
    // console.log('after fetch',contacts)
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
