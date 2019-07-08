import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import LogCard from './LogCard.js'
import moment from 'moment'


class MainDisplay extends React.Component{

  state = {
    time:'',
    date:''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  renderCalls = () => {
    // returns calls and the ones in the future
    const upComingCalls = this.props.state.logs.filter ((call)=>{
      return call.log_type === true && moment(call.datetime).fromNow().split(" ")[0] === 'in'
    })

    return upComingCalls.map ((call)=>{
      return <LogCard attributes={call} page={'main'} />
    })
  }
  renderEvents = () => {
    const upComingEvents = this.props.state.logs.filter ((call)=>{
      return call.log_type === false && moment(call.datetime).fromNow().split(" ")[0] === 'in'
    })

    return upComingEvents.map ((call)=>{
      return <LogCard attributes={call} page={'main'} />
    })
  }

  render(){

    return(
      <Segment>
        <div class='main-container'>
          <div class='upcoming'>
            <Segment>
              <h4>Upcoming Calls</h4>
              {this.renderCalls()}
            </Segment>
          </div>
          <div class='upcoming'>
            <Segment>
              <h4>Upcoming Events</h4>
              {this.renderEvents()}
            </Segment>
          </div>
        </div>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(MainDisplay)
