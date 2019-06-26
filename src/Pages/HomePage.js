import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import MainDisplay from '../Components/MainDisplay.js'

class HomeContainer extends React.Component{

  componentDidMount(){
    if (!localStorage.token){
      // if the user does not have a token, redirect to Log In
      window.location.replace(`http://localhost:3001/login`)
    }
    // fetch('http://localhost:3000/contacts', {
    //   headers: {
    //     "Authorization": localStorage.getItem("token")
    //   }
    // }).then(res => res.json())
    //   .then(console.log)
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

export default connect()(HomeContainer)
