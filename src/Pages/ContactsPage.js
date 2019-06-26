import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import ContactCard from '../Components/ContactCard.js'

class ContactsPage extends React.Component{

  componentDidMount(){
    if (!localStorage.token){
      // if the user already has a token, redirect to homepage
      window.location.replace(`http://localhost:3001/login`)
    }
  }

  renderContacts = () => {
    return this.props.state.contacts.map((contact)=>{
      console.log(contact)
      const { username } = contact
      // console.log(phone)
      return <ul><ContactCard
        username={username}
        /></ul>
    })
  }

  render(){
    console.log(this.props.state)
    return(
      <div>
      Contacts Page
      <NavBar/>
      {this.renderContacts()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(ContactsPage)
