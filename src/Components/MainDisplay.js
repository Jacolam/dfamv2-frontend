import React from 'react'
import { connect } from 'react-redux'


class MainDisplay extends React.Component{

  render(){

    return(
      <div>
      MainDisplay Container
        <div>
          upcoming calls
          <ul>
            <li>
              call 1
              <button>Complete Call</button>
            </li>
          </ul>
        </div>
        <div>
          up coming events
          <ul>
            <li>
              Meet up with Jane Doe @ 6PM for dinner @
              /*needs date, time , where ,contact id, complete:boolean*/
              <button>Complete Event</button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default MainDisplay
