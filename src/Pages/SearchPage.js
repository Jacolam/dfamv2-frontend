import React from 'react'
import { Segment } from 'semantic-ui-react'
import NavBar from '../Components/NavBar.js'

class SearchPage extends React.Component{

  render(){
    return(
      <div>
      Search Page
        <NavBar />
        <Segment>
        render all users 
        </Segment>
      </div>

    )
  }

}

export default SearchPage
