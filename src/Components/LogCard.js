import React from 'react'
// import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import moment from 'moment'

class LogCard extends React.Component {
  render(){
    // console.log(this.props)
    // console.log('log type', this.props.attributes.log_type)
    const date = moment(this.props.attributes.datetime).format('MMM DD YYYY')
    const time = moment(this.props.attributes.datetime).format('H:mm A')

    return(
      <div>
        <Segment>
          {`${date},`}<br/>
        {this.props.attributes.log_type ? "call" : "Meet up"}
          {`@ ${time}, ${moment(this.props.attributes.datetime).fromNow()}`}<br/>
          {this.props.attributes.completed ? 'Completed' : <button> Complete </button>}
          <button value='EDIT'> Edit</button>
          <button value='DELETE'> Delete</button>
        </Segment>
      </div>
    )
  }
}

// If call style one way , else if meetup style another way

// STYLE THE COMPLETE TO BE A GREEN BUTTON
// INCOMPLETE SHOULD BE GRAY

export default LogCard
