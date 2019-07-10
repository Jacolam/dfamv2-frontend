import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar.js'
import hasToken from '../hasToken.js'
import { Button, Segment } from 'semantic-ui-react'

class SettingPage extends React.Component{

  componentDidMount(){
    hasToken()
  }

  state = {
    edit: false,
    username: "",
    phone: "",
    email: "",
    twitter: "",
    facebook: "",
    avatar: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

    this.setState({
      edit: true
    })

    fetch(`http://localhost:3000/api/v1/profile/edit`,{
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(data => {
        this.setState({
          username: data.user.username,
          phone: data.user.phone,
          email: data.user.email,
          twitter: data.user.twitter,
          facebook: data.user.facebook,
          avatar: data.user.avatar
        })
        // should use redux state, here
      })

  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/user/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(this.state)
    })
    .then( this.props.updateInfo(this.state) )

    this.setState({
      edit: false
    })
  }

  render(){
    return(
      <div>
        <NavBar/>
        <Segment style={{backgroundColor: '#f2f2f2'}}>
          <div style={{display:'flex'}}>

            <div style={{display:'flex', flexDirection: 'column', width: '18.5%'}}>
              <img class='profile-picture'src={this.props.state.settings.avatar} />
              <Button onClick={this.openWidget} color="blue"> Upload Avatar Image</Button>
            </div>

            <div style={{display:'flex', width: '50%', marginTop: '20px'}}>
              <h4 class='names'>
                Username:<br/><br/>
                Phone:<br/><br/>
                Email:<br/><br/>
                Twitter:<br/><br/>
                Facebook:<br/><br/>
              </h4>
              <div>
                { this.state.edit ? (
                  <div>
                    <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                      <input type='text' name='username' value={this.state.username} ></input><br/><br/>
                      <input type='text' name='phone' value={this.state.phone} ></input><br/><br/>
                      <input type='text' name='email' value={this.state.email} ></input><br/><br/>
                      <input type='text' name='twitter' value={this.state.twitter} ></input><br/><br/>
                      <input type='text' name='facebook' value={this.state.facebook} ></input><br/><br/>
                      <Button type="submit">Submit</Button>
                    </form>
                  </div>
                ):(
                  <div>
                    {this.props.state.settings.username}<br/><br/>
                    {this.props.state.settings.phone}<br/><br/>
                    {this.props.state.settings.email}<br/><br/>
                    {this.props.state.settings.twitter}<br/><br/>
                    {this.props.state.settings.facebook}<br/><br/>
                  </div>
                  )
                }
              </div>
            </div>
          </div>
        </Segment>
        <Button onClick={this.editForm}> Change Contact Info </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAvatar: (image) => dispatch({type:"CHANGE_IMAGE", image}),
    updateInfo: (settings) => dispatch({type:"UPDATE_INFO", settings})
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
