import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Image, Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'


class ContactCard extends React.Component{

  handleClick = (e,props) =>{
    const target = e.target.innerHTML
    switch(target){
      case "Twitter":
        window.open(this.props.twitter)
      break;
      case "Facebook":
        window.open(this.props.facebook)
      break;
      case "Remove":

        fetch('http://localhost:3000/api/v1/removecontact', {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify(this.props)
        }).then(res => res.json())
          .then(data => {
          this.props.removeContact(this.props)
          })

      break;
      default:
      this.props.showContact()
      this.props.detailedContact(this.props)
    }
  }

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render(){
    return(
      <Card onClick={ (e) => this.handleClick(e,this.props)} >
        <Image src={this.props.avatar} />
        <Card.Header id={this.props.username}>
          {this.capitalize(this.props.username)}
        </Card.Header>
        <Card.Meta >
          <Icon color='black' name='phone' />
           every {this.props.callCycle}
           <br/>
          <Icon color='brown' name='coffee' />
           every {this.props.meetCycle}
        </Card.Meta>
        <Card.Description textAlign='center'>
          <Button onClick={this.handleClick}>Twitter</Button>
          <Button onClick={this.handleClick}>Facebook</Button>
          <Button onClick={this.handleClick}>Remove</Button>
        </Card.Description>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    showContact: () => dispatch({ type: 'SHOW_CONTACT'}),
    detailedContact: (contact) => dispatch({ type: 'DETAILED_CONTACT',contact}),
    removeContact: (contact) => {
      dispatch({ type: 'REMOVE_CONTACT',contact})
      dispatch({ type: 'REMOVE_LOGS_CONTACT', contact})
    }
  }
}
export default connect(null,mapDispatchToProps)(ContactCard)
