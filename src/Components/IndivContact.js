import React from 'react'
import { connect } from 'react-redux'
import hasToken from '../hasToken.js'


class IndivContact extends React.Component{

  state = {
    time:'',
    date:'',
    log_type:false,
    attendee_id: ''
  }

  componentDidMount(){
    hasToken()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
    this.setState({
      attendee_id: this.props.state.detailedContact.id
    })
  }

  handleClick = () => {
    this.props.showContact()
  }

  handleSubmit = (e) => {
    e.preventDefault()


    console.log(`submitted`)
    console.log(this.state)

    fetch('http://localhost:3000/api/v1/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(this.state)
      }
    ).then(res => res.json())
    .then(console.log)

  }

  render(){
    console.log(this.props.state.detailedContact)
    return(
      <div>
        {this.props.state.detailedContact.username}<br/>
        <form onSubmit={this.handleSubmit}>
          <input type='time' onChange={this.handleChange} name="time" step="60" ></input>
          <input type='date' onChange={this.handleChange} name="date"></input>
          <select name='log_type' onChange={this.handleChange}>
            <option value={!!false}>Meet Up</option>
            <option value={!!true}>Call</option>
          </select>
          <button type='submit'>Create event </button>
        </form>
        <button onClick={this.handleClick}>Go Back</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = (dispatch) =>{
  return{
    showContact: () => dispatch({ type: 'SHOW_CONTACT'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndivContact)
