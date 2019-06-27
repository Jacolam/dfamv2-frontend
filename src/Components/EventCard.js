import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'


class EventCard extends React.Component{



  render(){
    console.log(this.props)
    return(
      <ul>
      {this.props.name}
      <button>Attend!</button>
        <div>
          {this.props.location}<br/>
          {this.props.date}<br/>
        {this.props.time}<br/>
        </div>
      {this.props.description}
      </ul>
    )
  }
}

export default connect()(EventCard)