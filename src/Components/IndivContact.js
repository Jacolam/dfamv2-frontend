import React from 'react'
import { connect } from 'react-redux'
import hasToken from '../hasToken.js'
import moment from 'moment'
import { Segment, Icon, Button } from 'semantic-ui-react'
import LogCard from './LogCard.js'


class IndivContact extends React.Component{

  state = {
    time:'',
    date:'',
    log_type:false,
    attendee_id: '',
    call_cycle: '',
    meet_cycle: '',
    edit: false
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

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render(){
    console.log(this.props.state.detailedContact)
    return(
      <div>
        <Segment>
          {this.capitalize(this.props.state.detailedContact.username)}<br/>
          <Segment>
            <Icon color='black' name='phone' />
             every {this.props.state.detailedContact.callCycle}
             <br/>
            <Icon color='brown' name='coffee' />
             every {this.props.state.detailedContact.meetCycle}
            <br/>

            Phone: {this.props.state.detailedContact.phone}<br/>
            Email: {this.props.state.detailedContact.email}<br/>
            <Button>Edit Cycles</Button>
          </Segment>

          <form onSubmit={this.handleSubmit}>
            <input type='time' onChange={this.handleChange} name="time" step="60" ></input>
            <input type='date' onChange={this.handleChange} name="date"></input>
            <select name='log_type' onChange={this.handleChange}>
              <option value={false}>Meet Up</option>
              <option value={true}>Call</option>
            </select>
            <Button type='submit'>Create event </Button>
          </form>

          <Button onClick={this.handleClick}>Go Back</Button><br/>

        </Segment>

        <Segment>
          Logs below
          {this.renderLogs()}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {state}
}

const mapDispatchToProps = dispatch =>{
  return{
    showContact: () => dispatch({type: 'SHOW_CONTACT'}),
    addLog: (log) => dispatch({type: 'ADD_LOG', log})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndivContact)
