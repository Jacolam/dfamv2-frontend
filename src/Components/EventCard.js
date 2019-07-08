import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Segment, Button } from 'semantic-ui-react'



class EventCard extends React.Component{



  render(){
    console.log(this.props)
    return(
      <Segment>
      {this.props.name}
      <Button>Attend!</Button>
        <div>
          {this.props.location}<br/>
          {this.props.date}<br/>
        {this.props.time}<br/>
        </div>
      {this.props.description}
    </Segment>
    )
  }
}

export default connect()(EventCard)
