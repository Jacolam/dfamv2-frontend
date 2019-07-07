import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import hasToken from '../hasToken.js'
import { Button, Segment } from 'semantic-ui-react'

class SettingPage extends React.Component{

  componentDidMount(){
    hasToken()
  }

  openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: "dcbn7dhvc",
        uploadPreset:"kzlwzndn"
      },
      (error, result) => {
        if ( result && result.event === 'success'){
          this.props.changeAvatar(`https://res.cloudinary.com/dcbn7dhvc/image/upload/${result.info.path}`)
          fetch(`http://localhost:3000/api/v1/user/update`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accepts: 'application/json',
              "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(this.props.state.settings)
          })
        }
      }
    ).open()
  }

  editForm = () => {
    console.log('you wanan edit me!?!?!')
  }

  render(){
    return(
      <div>
        Setting Page
        <NavBar/>
        <Segment>
          <div class='container'>
            <div class='names'>
              Username:<br/>
              Phone:<br/>
              Email:<br/>
              Twitter:<br/>
              Facebook:<br/>
            </div>
            <div>
              {this.props.state.settings.username}<br/>
              {this.props.state.settings.phone}<br/>
              {this.props.state.settings.email}<br/>
              {this.props.state.settings.twitter}<br/>
              {this.props.state.settings.facebook}<br/>
            </div>
            <div class='container'>
              <img class='profile-picture'src={this.props.state.settings.avatar} />
              <Button onClick={this.openWidget}> Upload Avatar Image</Button>
            </div>
          </div>
        </Segment>
        <Button onClick={this.editForm}> Change Contact Info</Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAvatar: (image) => dispatch({type:"CHANGE_IMAGE", image})
  }
}
const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
