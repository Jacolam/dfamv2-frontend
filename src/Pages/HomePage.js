import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import MainDisplay from '../Components/MainDisplay.js'
import hasToken from '../hasToken.js'

class HomeContainer extends React.Component{

  componentDidMount(){
    hasToken().then(data => {
      this.props.setSettings(data)
      this.props.setContacts(data.contacts)
      this.props.setLogs(data.logs,data.inverse_logs)
    })
  }

  render(){
    return(
      <div>
        <NavBar/>
        <MainDisplay/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setContacts: (contacts) => dispatch({type:'SET_CONTACTS',contacts}),
    setLogs: (logs,inverse_logs) => dispatch({type:'SET_LOGS',logs,inverse_logs}),
    setSettings: (data) => dispatch({type:'SET_SETTINGS', data })
  }
}
const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
