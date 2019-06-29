const initialState = {
  loggedIn: false,
  contacts: [],
  upComingCalls: [],
  upComingEvents: [],
  events: [],
  allContacts: true,
  detailedContact:{},
  logs: []
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
    case 'SET_LOGS':
    // need to combine all the logs that i created, and all the logs that people have created for me
      const logsCopy = action.logs.concat(action.inverse_logs)
      console.log(logsCopy)
      return {
        ...state,
        logs: logsCopy
      }
    case 'SHOW_CONTACT':
    // hide and show indiv contacts or all contacts
      return {
        ...state,
        allContacts: !state.allContacts
      }
    case 'DETAILED_CONTACT':
    console.log(action.contact)
      return {
        ...state,
        detailedContact: action.contact
      }
    default:
      return state
  }
}

export default appReducer
