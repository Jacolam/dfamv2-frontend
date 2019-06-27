import React from 'react'
import { connect } from 'react-redux'


class MainDisplay extends React.Component{

  state = {
    time:'',
    date:''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  // <input type='time' onChange={this.handleChange} name="time" step="60" ></input>
  // step 60 removes the minutes from the the input field 
  // <input type='date' onChange={this.handleChange} name="date"></input>

  render(){

    return(
      <div>
      MainDisplay Container
        <div>
          upcoming calls
          <ul>
            <li>
              call 1
              <input type='time' onChange={this.handleChange} name="time" step="60" ></input>
              <input type='date' onChange={this.handleChange} name="date"></input>
              <button>Complete Call</button>
            </li>
          </ul>
        </div>
        <div>
          up coming events
          <ul>
            <li>
              Meet up with Jane Doe @ 6PM for dinner @
              {/*needs date, time , where ,contact id, complete:boolean*/}
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

export default connect(mapStateToProps)(MainDisplay)
