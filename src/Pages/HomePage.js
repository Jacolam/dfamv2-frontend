import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import MainDisplay from '../Components/MainDisplay.js'
import hasToken from '../hasToken.js'
import { Icon } from 'semantic-ui-react'

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
      .then(data => {
    console.log(data)
    this.props.setContacts(data.contacts)
    this.props.setLogs(data.logs,data.inverse_logs)
    })
  }

  render(){
    console.log(this.props.state)
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
    setContacts: (contacts) => dispatch({type:'SET_CONTACTS',contacts}),
    setLogs: (logs,inverse_logs) => dispatch({type:'SET_LOGS',logs,inverse_logs})
  }
}
const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
