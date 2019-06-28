import React from 'react'
import { connect } from 'react-redux'
import hasToken from '../hasToken.js'


class IndivContact extends React.Component{

  componentDidMount(){
    hasToken()
  }

  handleClick = () => {
    this.props.showContact()
  }

  render(){
    console.log(this.props.state.detailedContact)
    return(
      <div>
        {this.props.state.detailedContact.username}<br/>
        this should show indiv profile of the user that we clicked
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
