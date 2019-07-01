import React from 'react'
import { connect } from 'react-redux'
import { Card, Image , Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'


class AddContactCard extends React.Component{

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
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    showContact: () => dispatch({ type: 'SHOW_CONTACT'}),
    detailedContact: (contact) => dispatch({ type: 'DETAILED_CONTACT',contact}),
  }
}
export default connect(null,mapDispatchToProps)(AddContactCard)
