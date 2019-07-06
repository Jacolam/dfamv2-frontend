import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import LogCard from './LogCard.js'
// import moment from 'moment'


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
    const upComingCalls = this.props.state.logs.filter ((call)=>{
      return call.log_type === true
    })
    return upComingCalls.map ((call)=>{
      return <LogCard attributes={call} page={'main'} />
    })
  }
  renderEvents = () => {
    const upComingEvents = this.props.state.logs.filter ((call)=>{
      return call.log_type === false
    })

    return upComingEvents.map ((call)=>{
      return <LogCard attributes={call} page={'main'} />
    })
  }

  render(){

    return(
      <Segment>
        <div class='container'>
          <div class='container'>
            <Segment>
              <h4>Upcoming Calls</h4>
              {this.renderCalls()}
            </Segment>
          </div>
          <div class='container'>
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
