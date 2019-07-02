import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import hasToken from '../hasToken.js'
import { Segment } from 'semantic-ui-react'

class SettingPage extends React.Component{

  componentDidMount(){
    hasToken()

  }

  render(){
    return(
      <div>
        Setting Page
        <NavBar/>
        <Segment>
        User Settings
        </Segment>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
