const initialState = {
  loggedIn: false,
  contacts: [],
  upComingCalls: [],
  upComingEvents: [],
  events:[]
}

function appReducer( state = initialState , action){
  switch(action.type){
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: true
      }
    case 'SET_CONTACTS':
    const contactsCopy = action.contacts
      return {
        ...state,
        contacts: contactsCopy
      }
    case 'SET_EVENTS':
    const eventsCopy = action.events
      return {
        ...state,
        events: eventsCopy
      }
    default:
      return state
  }
}

export default appReducer
