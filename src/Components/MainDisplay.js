import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import LogCard from './LogCard.js'


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
  // renderEvents = () => {
  //
  // }

  render(){
    console.log(this.props.state)

    return(
      <Segment>
      Dashboard
        <Segment>
          <h4>Happening today</h4>
            <ul>
              <li>
              </li>
            </ul>
        </Segment>
        <Segment>
          <h4>Upcoming Calls</h4>
              {this.renderCalls()}
        </Segment>
        <Segment>
          <h4>Upcoming Events</h4>
          <ul>
            <li>
              Meet up with Jane Doe @ 6PM for dinner @
              {/*needs date, time , where ,contact id, complete:boolean*/}
              <button>Complete Event</button>
            </li>
          </ul>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(MainDisplay)
