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
      return <LogCard attributes={call} page={'main'} />
    })
  }
  renderEvents = () => {
    return this.props.state.upComingEvents.map ((call)=>{
      return <LogCard attributes={call} page={'main'} />
    })
  }

  render(){

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
