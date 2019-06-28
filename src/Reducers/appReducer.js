const initialState = {
  loggedIn: false,
  contacts: [],
  upComingCalls: [],
  upComingEvents: [],
  events:[],
  allContacts: true
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
    case 'SHOW_CONTACT':
      console.log("we here")
      return {
        ...state,
        allContacts: !state.allContacts
      }
    default:
      return state
  }
}

export default appReducer
