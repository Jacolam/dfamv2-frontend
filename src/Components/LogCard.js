import React from 'react'
import moment from 'moment'
import { Segment } from 'semantic-ui-react'
import { Button, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

class LogCard extends React.Component {



  avatarDisplay = () => {
    const contactInfo = this.props.state.contacts.find( (contact)=>{
      return contact.contactee.id ===this.props.attributes.attendee_id
    })
    if (this.props.page){
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
    console.log('we have been clicked')
  }
  handleDelete = () => {
    console.log('we have been clicked')
  }

  render(){
    const date = moment(this.props.attributes.datetime).format('MMM DD YYYY')
    const time = moment(this.props.attributes.datetime).format('H:mm A')

    return(
      <div>
        <Segment color={ time === '0:00 AM' ? 'red' : "green"}>
          {`${date},`}<br/>
          {this.props.attributes.log_type ? `Call` : `Meet up`}
          {` @ ${time}, ${moment(this.props.attributes.datetime).fromNow()}`}<br/>
          {this.avatarDisplay()}
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
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {state}
}
const mapDispatchToProps = dispatch => {
  return {
    changeStatus: (log) => dispatch({type:"CHANGE_STATUS", log})
    // changeCallStatus: (log) => dispatch({type:"CHANGE_CALL", log}),
    // changeMeetStatus: (log) => dispatch({type:"CHANGE_MEET", log})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogCard)
