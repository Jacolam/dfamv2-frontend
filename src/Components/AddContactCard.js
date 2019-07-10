import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'

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
        <Image src={this.props.avatar} style={{height: '200px'}} />
        <Card.Header id={this.props.username} textAlign='center' style={{marginBottom: '5px'}}>
          {this.capitalize(this.props.username)}<br/>
          <Button onClick={ (e) => this.handleClick(e,this.props)}>Add Contact</Button>
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
