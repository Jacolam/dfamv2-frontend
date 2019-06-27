import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'


class ContactCard extends React.Component{

  render(){
    console.log(this.props)
    return(
      <div>
        {this.props.username}
        <button>Log Call</button>
        <button>Meet up</button>
        <button>Twitter</button>
        <button>Facebook</button>
      </div>
    )
  }
}

export default connect()(ContactCard)
