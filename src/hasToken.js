
function hasToken(){
  if (!localStorage.token){
    // if the user does not have a token, redirect to Log In
     window.location.replace(`http://dfam.herokuapp.com/login`)

     return Promise.reject()
  }
  // SEND INITIAL FETCH REQUEST
  return fetch('https://vast-meadow-14014.herokuapp.com/api/v1/contacts', {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  }).then(res => res.json())
}

export default hasToken
