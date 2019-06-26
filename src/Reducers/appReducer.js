const initialState = {
  loggedIn: false,
  contacts: [],
  upComingCalls: [],
  upComingEvents: []
}

function appReducer( state = initialState , action){
  switch(action.type){
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: true
      }
    default:
      return state
  }
}

export default appReducer
