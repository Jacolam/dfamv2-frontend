import React from 'react'
import moment from 'moment'
import { Segment } from 'semantic-ui-react'
import { Button, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

class LogCard extends React.Component {

  state = {
    time:'',
    date:'',
    log_type:false,
    id: '',
    edit: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  avatarDisplay = () => {
    const contactInfo = this.props.state.contacts.find( (contact)=>{
      return contact.contactee.id ===this.props.attributes.attendee_id
    })
    if (this.props.page  && contactInfo){
      return   <Image size='small' src={contactInfo.contactee.avatar} />
    }
  }

  handleComplete = () => {
    console.log(this.props.attributes)
    fetch(`http://localhost:3000/api/v1/logs/${this.props.attributes.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        "Authorization": localStorage.getItem("token")
      }
    }).then( res => res.json())
    .then(data => {
        this.props.changeStatus(data)
    })

  }

  handleEdit = () => {
    this.setState({
      time: moment(this.props.attributes.datetime).format('H:mm A'),
      date: moment(this.props.attributes.datetime).format('MMM DD YYYY'),
      log_type: this.props.attributes.log_type,
      id: this.props.attributes.id,
      edit: !this.state.edit
    })
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/logs/${this.props.attributes.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => {
      this.props.deleteLog(this.props.attributes.id)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/logs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(this.state)
      }
    ).then(res => res.json())
    .then( data => {
      this.props.updateLog(data)
      this.setState({
        edit: false
      })
    })

  }

  render(){
    const date = moment(this.props.attributes.datetime).format('MMM DD YYYY')
    const time = moment(this.props.attributes.datetime).format('h:mm A')

    return(
        <Segment color={ time === '12:00 AM' ? 'red' : "green"} >
          <div class='container'>
            <div class='content'>

              <div>
                {`${date},`}<br/>
                {this.props.attributes.log_type ? `Call` : `Meet`}
                {` @ ${time}, ${moment(this.props.attributes.datetime).fromNow()}`}<br/>
              </div>

              <div>
                <br/>
                {this.state.edit ? (
                  <form onSubmit={this.handleSubmit}>

                    <div>
                      <input type='time' onChange={this.handleChange} name="time" step="60" ></input>
                      <input type='date' onChange={this.handleChange} name="date"></input>
                    </div><br/>

                    <div>
                      <select name='log_type' onChange={this.handleChange}>
                        <option value={false}>Meet Up</option>
                        <option value={true}>Call</option>
                      </select>
                      <Button size='mini' type='submit'> Save Changes </Button>
                    </div>

                  </form>
                ):('')}
                <br/>
              </div>

              <div class='button-container'>
                {this.props.attributes.completed ? (
                  <Button color='green' inverse onClick={this.handleComplete}>
                    Completed
                  </Button>
                ):(
                  <Button animated onClick={this.handleComplete}>
                    <Button.Content visible>Complete</Button.Content>
                    <Button.Content hidden >
                      <Icon name='check' color='green'></Icon>
                    </Button.Content>
                  </Button>
                )}
                <Button animated onClick={this.handleEdit}>
                  <Button.Content visible >Edit</Button.Content>
                  <Button.Content hidden>
                    <Icon name='edit' color='black'></Icon>
                  </Button.Content>
                </Button>
                <Button animated onClick={this.handleDelete}>
                   <Button.Content visible>Delete</Button.Content>
                   <Button.Content hidden>
                     <Icon name='remove' color='red' inverse></Icon>
                   </Button.Content>
                </Button>
              </div>

            </div>

            <div>
              {this.avatarDisplay()}
            </div>

          </div>
        </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {state}
}
const mapDispatchToProps = dispatch => {
  return {
    changeStatus: (log) => dispatch({type: "CHANGE_STATUS", log}),
    updateLog: (log) => dispatch({type: "UPDATE_LOG", log}),
    deleteLog: (log) => dispatch({type: "DELETE_LOG", log})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogCard)
