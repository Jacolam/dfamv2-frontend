import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import hasToken from '../hasToken.js'
import EventCard from '../Components/EventCard'
import { Segment } from 'semantic-ui-react'



class EventsPage extends React.Component{

  componentDidMount(){
    hasToken()
    fetch('http://localhost:3000/api/v1/events', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(events => {
        this.props.setEvents(events)
      })
  }

  renderEvents = () => {
    return this.props.state.events.map( event =>{
      //destructoring 
      const { id , name , location , date , time , description } = event
      return (
        <EventCard
          key={id}
          name={name}
          location={location}
          date={date}
          time={time}
          description={description}
        />)
    })
  }

  render(){
    return(
      <div>
      <NavBar/>
        <Segment>
          {this.renderEvents()}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEvents: (events) => dispatch({type:'SET_EVENTS',events})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventsPage)
