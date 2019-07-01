import React from 'react'
import { connect } from 'react-redux'
import { Card, Image , Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'


class AddContactCard extends React.Component{

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleClick = (e) => {

    fetch('http://localhost:3000/api/v1/addperson', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({username: this.props.username})
    }).then(res => res.json())
      .then(data => {
        this.props.addUser(data)
      })
      
  }

  render(){
    return(
      <Card>
        <Image src={this.props.avatar} />
        <Card.Header id={this.props.username}>
          {this.capitalize(this.props.username)}<br/>
          <button onClick={ (e) => this.handleClick(e,this.props)}>Add Contact</button>
        </Card.Header>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    addUser: (user) => {
      dispatch({ type: 'ADD_USER_TO_CONTACTS',user})
      dispatch({ type: 'REMOVE_USER_FROM_PEOPLE',user})

    }
  }
}
export default connect(null,mapDispatchToProps)(AddContactCard)
