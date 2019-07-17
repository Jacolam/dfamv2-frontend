
function hasToken(){
  if (!localStorage.token){
    // if the user does not have a token, redirect to Log In
     window.location.replace(`http://localhost:3001/login`)

     return Promise.reject()
  }
  // SEND INITIAL FETCH REQUEST
  return fetch('http://localhost:3000/api/v1/contacts', {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  }).then(res => res.json())
}

export default hasToken
