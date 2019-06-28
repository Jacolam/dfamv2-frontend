import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import ContactCard from '../Components/ContactCard.js'
import IndivContact from '../Components/IndivContact.js'
import hasToken from '../hasToken.js'


class ContactsPage extends React.Component{

  componentDidMount(){
    hasToken()
  }

  renderContacts = () => {
    return this.props.state.contacts.map((contact)=>{
      // console.log(contact)
      return <ul><ContactCard
        key={contact.contactee.username}
        username={contact.contactee.username}
        meetCycle={contact.meet_cycle}
        callCycle={contact.call_cycle}
        avatar={contact.contactee.avatar}
        twitter={contact.contactee.twitter}
        facebook={contact.contactee.facebook}
        /></ul>
    })
  }

  render(){
    console.log(this.props.state.allContacts)
    const allContacts = this.props.state.allContacts
    return(
      <div>
      Contacts Page
      <NavBar/>
      Looking for someone?
      { allContacts ? this.renderContacts() : <IndivContact />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(ContactsPage)
