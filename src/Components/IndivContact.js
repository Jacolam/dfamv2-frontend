import React from 'react'
import { connect } from 'react-redux'
import hasToken from '../hasToken.js'
import moment from 'moment'
import { Segment, Icon, Button, Input } from 'semantic-ui-react'
import IndivLogCard from './IndivLogCard.js'


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
    })
  }

  handleClick = () => {
    this.props.showContact()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const datetime = moment(this.state.date + " " + this.state.time)

    fetch('https://vast-meadow-14014.herokuapp.com/api/v1/logs', {
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
      return <IndivLogCard attributes={log} />
    })
  }

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  editCycle = () => {
    if (this.state.edit){
      console.log('submit')
      fetch('https://vast-meadow-14014.herokuapp.com/api/v1/contacts/update', {
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
    return(
      <div>
        <Segment style={{backgroundColor: '#f2f2f2'}}>

          <h2>
            {this.capitalize(this.props.state.detailedContact.username)}<br/>
          </h2>

          <div style={{display: 'flex'}}>

            <Segment style={{margin: `0`,width: `50%`}}>
              <div class='container' style={{justifyContent: 'left'}}>
                <div style={{width: '50%'}}>
                  <Icon color='black' name='phone' />
                  <span>every </span>
                  {this.state.edit ? (
                    <Input
                      name='call_cycle'
                      onChange={this.handleChange}
                      value={this.state.call_cycle}
                      size='2'>
                    </Input>
                  ):(this.props.state.detailedContact.callCycle)}
                  <span> days</span>
                  <br/>
                  <Icon color='brown' name='coffee' />
                  <span>every </span>
                  {this.state.edit ? (
                    <Input
                      name='meet_cycle'
                      onChange={this.handleChange}
                      value={this.state.meet_cycle}
                      size='2'>
                    </Input>
                  ):(this.props.state.detailedContact.meetCycle)}
                  <span> days</span>
                </div>
                <div>
                  Phone: {this.props.state.detailedContact.phone}<br/>
                  Email: {this.props.state.detailedContact.email}<br/>
                </div>
              </div>
              <br/>
              <Button onClick={this.editCycle}>{this.state.edit? 'Submit' : 'Edit Cycles'}</Button>
            </Segment>

            <Segment style={{margin: `0`,width: `50%`}}>
              <form onSubmit={this.handleSubmit}>

                <div>
                  <Input type='time' onChange={this.handleChange} name="time" step="60" ></Input>
                  <Input type='date' onChange={this.handleChange} name="date"></Input>
                </div>
                <br/>

                <div style={{margin: `0`,display: `flex`}}>

                  <div style={{margin: `0`,width: `20%`}}>
                    <select name='log_type' onChange={this.handleChange}>
                      <option value={false}>Meet Up</option>
                      <option value={true}>Call</option>
                    </select>
                  </div>

                  <div>
                    <Button type='submit'>Create Event </Button>
                  </div>

                </div>

              </form>
            </Segment>

          </div>

          <br/>

        </Segment>

        <Button onClick={this.handleClick} >Go Back</Button><br/>

        <Segment style={{backgroundColor: '#f2f2f2'}} >
          <h4>
            History
          </h4>
          <div style={{display: 'flex', "flex-direction": 'column'}}>
            {this.renderLogs()}
          </div>
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
