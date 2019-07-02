import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import MainDisplay from '../Components/MainDisplay.js'
import hasToken from '../hasToken.js'
// import { Icon } from 'semantic-ui-react'
import moment from 'moment'

class HomeContainer extends React.Component{

  componentDidMount(){
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

        const upComing = this.props.state.logs.filter( (log)=>{
          const logToArr = moment(log.datetime).fromNow().split(" ")
          return logToArr[0] === 'in'
        })

        const sortedUpComing = upComing.sort((a,b) => {
          if(a.datetime < b.datetime){
            return -1
          } else {
            return 1
          }
        })
        this.props.setUpComing(sortedUpComing)

    })
  }

  render(){
    // console.log(this.props)
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
    setLogs: (logs,inverse_logs) => dispatch({type:'SET_LOGS',logs,inverse_logs}),
    setUpComing: (upcoming) => {
      dispatch({type:"SET_UPCOMING_CALLS", upcoming})
      dispatch({type:"SET_UPCOMING_EVENTS", upcoming})
    }
  }
}
const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
