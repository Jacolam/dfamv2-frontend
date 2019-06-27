import React from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'


class ContactCard extends React.Component{

  handleClick = (e) =>{
    // console.log(e.target.innerHTML)
    const target = e.target.innerHTML
    switch(target){
      case "Twitter":
        window.open(this.props.twitter)
      break;
      case "Facebook":
        window.open(this.props.facebook)
      break;
    }
  }

  render(){
    console.log(this.props)
    return(
      <Card>
        <Image src={this.props.avatar}/>
        <Card.Header>{this.props.username}</Card.Header>
        <Card.Meta>
          Call every {this.props.callCycle}<br/>
          Meet every {this.props.meetCycle}
        </Card.Meta>
        <Card.Description>
          <button>Log Call</button>
          <button>Meet up</button>
          <button onClick={this.handleClick}>Twitter</button>
          <button onClick={this.handleClick}>Facebook</button>
        </Card.Description>
      </Card>
    )
  }
}

export default connect()(ContactCard)
