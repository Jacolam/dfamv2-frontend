import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import ContactCard from '../Components/ContactCard.js'
import IndivContact from '../Components/IndivContact.js'
import hasToken from '../hasToken.js'
import { Card } from 'semantic-ui-react'


class ContactsPage extends React.Component{

  componentDidMount(){
    hasToken()
    //duplicated code, using for dev purposes, needs to send fetch request from whatever page, to retrieve infomation
    fetch('http://localhost:3000/api/v1/contacts', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(data => {
        this.props.setContacts(data.contacts)
        this.props.setLogs(data.logs,data.inverse_logs)
    })
  }

  renderContacts = () => {
    return this.props.state.contacts.map((contact)=>{
      return <ContactCard
        key={contact.contactee.username}
        id={contact.contactee.id}
        username={contact.contactee.username}
        meetCycle={contact.meet_cycle}
        callCycle={contact.call_cycle}
        avatar={contact.contactee.avatar}
        twitter={contact.contactee.twitter}
        facebook={contact.contactee.facebook}
        />
    })
  }

  render(){
    const allContacts = this.props.state.allContacts
    return(
      <div>
        Contacts Page
        <NavBar/>
        { allContacts ? (
          <Card.Group itemsPerRow={3}>
            {this.renderContacts()}
          </Card.Group>
          ):(
          <IndivContact />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

//duplicated code, using for dev purposes, needs to send fetch request from whatever page, to retrieve infomation
const mapDispatchToProps = (dispatch) => {
  return {
    setContacts: (contacts) => dispatch({type:'SET_CONTACTS',contacts}),
    setLogs: (logs,inverse_logs) => dispatch({type:'SET_LOGS',logs,inverse_logs})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactsPage)
