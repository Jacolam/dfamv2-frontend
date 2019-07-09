import React from 'react'
import { Segment } from 'semantic-ui-react'
import NavBar from '../Components/NavBar.js'
import { connect } from 'react-redux'
import AddContactCard from '../Components/AddContactCard'
import { Card } from 'semantic-ui-react'

class SearchPage extends React.Component{

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/people', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(data => {
        this.props.setUnadded(data)
      })
  }

  renderPeople = () => {
    return this.props.state.people.map((person)=>{
      return <AddContactCard
        key={person.username}
        username={person.username}
        avatar={person.avatar}
      />
    })
  }

  render(){
    return(
      <div>
        <NavBar />
        <Segment style={{backgroundColor: '#f2f2f2'}}>
          <Card.Group itemsPerRow={5}>
            {this.renderPeople().length === 0 ? (
                <h3>Forgetting Someone 🤔?</h3>
            ):(
              this.renderPeople()
            )}
          </Card.Group>
        </Segment>
      </div>

    )
  }

}
const mapStateToProps = state => {
  return {state}
}

const mapDispatchToProps = dispatch =>{
  return {
    setUnadded: unadded => dispatch({ type:'SET_UNADDED',unadded})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage)
