import React from 'react'
import { connect } from 'react-redux'
import hasToken from '../hasToken.js'
import moment from 'moment'
import { Segment } from 'semantic-ui-react'
import LogCard from './LogCard.js'


class IndivContact extends React.Component{

  state = {
    time:'',
    date:'',
    log_type:false,
    attendee_id: ''
  }

  componentDidMount(){
    hasToken()

    this.setState({
      attendee_id: this.props.state.detailedContact.id
    })

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  handleClick = () => {
    this.props.showContact()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const datetime = moment(this.state.date + " " + this.state.time)

    fetch('http://localhost:3000/api/v1/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ ...this.state, datetime })
      }
    ).then(res => res.json())
    .then(data => {
      console.log('using moment',moment(data.datetime)._d)
      console.log(data)
      console.log(this.props.state)
      this.props.addLog(data)
    })

  }

  renderLogs = () => {
    const userLog = this.props.state.logs.filter( (log) => {
      return log.user_id === this.state.attendee_id
    })

    const inverseUserLog = this.props.state.logs.filter( (log) => {
      return log.attendee_id === this.state.attendee_id
    })

    const bothLogs = userLog.concat(inverseUserLog)

    return bothLogs.map( (log) => {
      return <LogCard attributes={log} />
    })
  }

  render(){

    return(
      <div>
        <Segment>
          {this.props.state.detailedContact.username}<br/>
          call every {this.props.state.detailedContact.callCycle}

          <form onSubmit={this.handleSubmit}>
            <input type='time' onChange={this.handleChange} name="time" step="60" ></input>
            <input type='date' onChange={this.handleChange} name="date"></input>
            <select name='log_type' onChange={this.handleChange}>
              <option value={false}>Meet Up</option>
              <option value={true}>Call</option>
            </select>
            <button type='submit'>Create event </button>
          </form>

          <button onClick={this.handleClick}>Go Back</button><br/>

        </Segment>

        <Segment>
          Logs below
          {this.renderLogs()}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = (dispatch) =>{
  return{
    showContact: () => dispatch({ type: 'SHOW_CONTACT'}),
    addLog: (log) => dispatch({ type: 'ADD_LOG', log})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndivContact)
