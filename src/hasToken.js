
function hasToken(){
  if (!localStorage.token){
    // if the user does not have a token, redirect to Log In
    window.location.replace(`http://localhost:3001/login`)
  }
  // SEND INITIAL FETCH REQUEST 
}

export default hasToken