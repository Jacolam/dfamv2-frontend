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
      attendee_id: this.props.state.detailedContact.id,
      call_cycle: this.props.state.detailedContact.callCycle,
      meet_cycle: this.props.state.detailedContact.meetCycle,
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

  editCycle = () => {
    if (this.state.edit){
      console.log('submit')
      fetch('http://localhost:3000/api/v1/contacts/update', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify(this.state)
        }
      )
      this.props.updateCycle(this.state)
    }

    this.setState({
      edit: !this.state.edit
    })

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
             {this.state.edit ? (
               <input
                 name='call_cycle'
                 onChange={this.handleChange}
                 value={this.state.call_cycle}>
              </input>
             ):(" ")}
             <br/>
            <Icon color='brown' name='coffee' />
             every {this.props.state.detailedContact.meetCycle}
             {this.state.edit ? (
               <input
                 name='meet_cycle'
                 onChange={this.handleChange}
                 value={this.state.meet_cycle}>
               </input>
             ):(" ")}
            <br/>

            Phone: {this.props.state.detailedContact.phone}<br/>
            Email: {this.props.state.detailedContact.email}<br/>
          <Button onClick={this.editCycle}>{this.state.edit? 'Submit' : 'Edit Cycles'}</Button>
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
    addLog: (log) => dispatch({type: 'ADD_LOG', log}),
    updateCycle: (cycle) => {
      dispatch({type: 'UPDATE_CALL_CYCLE', cycle })
      dispatch({type: 'UPDATE_MEET_CYCLE', cycle })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndivContact)
