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
    case 'GET_CONTACTS':
    const contactsCopy = action.contacts
    // using concat, was returning arr in arr
      return {
        ...state,
        contacts: contactsCopy
      }
    default:
      return state
  }
}

export default appReducer
