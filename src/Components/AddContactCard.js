import React from 'react'
import { connect } from 'react-redux'
import { Card, Image , Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'


class AddContactCard extends React.Component{

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleClick = (e) => {
    console.log (e , this.props)

    fetch('http://localhost:3000/api/v1/addperson', {
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(this.props)
    }).then(res => res.json())
      .then(console.log)
    // this.props.addUser(this.props.username)
    //wait for fetch request and recieve the data after creating a contact instanace
    // debugger
  }

  render(){
    console.log(this.props)
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
    addUser: (username) => {
      dispatch({ type: 'ADD_USER_TO_CONTACTS',username})
      dispatch({ type: 'REMOVE_USER_FROM_PEOPLE',username})

    }
  }
}
export default connect(null,mapDispatchToProps)(AddContactCard)
