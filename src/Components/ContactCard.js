import React from 'react'
import { connect } from 'react-redux'
import { Card, Image , Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'


class ContactCard extends React.Component{

  handleClick = (e,props) =>{
    // console.log(e.target.innerHTML)
    const target = e.target.innerHTML
    switch(target){
      case "Twitter":
        window.open(this.props.twitter)
      break;
      case "Facebook":
        window.open(this.props.facebook)
      break;
      default:
      // need a state for allcontacts: true
      //defaults needs to set state for contact to this props
      //render the contact componet with this information
      // hiding the render contacts
      // console.log('before envoked',this.props)
      this.props.showContact()
      // console.log(this.props)

    }
  }

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  render(){
    console.log(this.props)
    return(
      <Card onClick={ (e) => this.handleClick(e,this.props)} >
        <Image src={this.props.avatar} />
        <Card.Header id={this.props.username}>
          {this.capitalize(this.props.username)}
        </Card.Header>
        <Card.Meta >
          Call every {this.props.callCycle}
          <Icon color='black' name='phone' />
          <br/>
          Meet every {this.props.meetCycle}
          <Icon color='brown' name='coffee' />
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

const mapDispatchToProps = dispatch =>{
  return{
    showContact: () => dispatch({ type: 'SHOW_CONTACT'})
  }
}
export default connect(null,mapDispatchToProps)(ContactCard)
