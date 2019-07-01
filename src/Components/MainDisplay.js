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
    return this.props.state.upComingCalls.map ((call)=>{
      return <LogCard attributes={call} />
    })
  }
  renderEvents = () => {
    return this.props.state.upComingEvents.map ((call)=>{
      return <LogCard attributes={call} />
    })
  }

  // renderTodayLogs = () => {
  //   console.log(this.props.state)
  //   const todayLogs = this.props.state.logs.filter( log => {
  //     const date = moment(log.datetime).format('MMM DD YYYY')
  //     const timeFromNow = moment(log.datetime).fromNow()
  //     return typeof parseInt(timeFromNow.split(" ")[0]) === 'number'
  //   })
  //   console.log(todayLogs)
  //   <Segment>
  //     <h4>Happening today</h4>
  //     {this.renderTodayLogs()}
  //   </Segment>
  //
  // }

  render(){
    // console.log(this.props.state)

    return(
      <Segment>
      Dashboard
        <Segment>
          <h4>Upcoming Calls</h4>
              {this.renderCalls()}
        </Segment>
        <Segment>
          <h4>Upcoming Events</h4>
            {this.renderEvents()}
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(MainDisplay)
