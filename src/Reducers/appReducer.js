const initialState = {
  loggedIn: false,
  contacts: [],
  people: [],
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
      return {
        ...state,
        logs: logsCopy
      }
    case 'SET_UNADDED':
      const unaddedCopy = action.unadded
      return {
        ...state,
        people: unaddedCopy
      }
    case 'SHOW_CONTACT':
    // hide and show indiv contacts or all contacts
      return {
        ...state,
        allContacts: !state.allContacts
      }
    case 'DETAILED_CONTACT':
      return {
        ...state,
        detailedContact: action.contact
      }
    case 'ADD_LOG':
      const addLog = [...state.logs,action.log]
      return {
        ...state,
        logs: addLog
      }
    case 'ADD_USER_TO_CONTACTS':
      console.log('adding the reducer')
      // const addLog = [...state.logs,action.log]
      return {
        // ...state,
        // logs: addLog
      }
    case 'REMOVE_USER_FROM_PEOPLE':
      console.log('revmoing the reducer')
      // const addLog = [...state.logs,action.log]
      return {
        // ...state,
        // logs: addLog
      }
    case 'SET_UPCOMING_CALLS':
      const upComingCalls = action.upcoming.filter((upcoming)=>{
        return upcoming.log_type === true
      })
      return {
        ...state,
        upComingCalls: upComingCalls
      }
    case 'SET_UPCOMING_EVENTS':
      const upComingEvents = action.upcoming.filter((upcoming)=>{
        return upcoming.log_type === false
      })
      return {
        ...state,
        upComingEvents: upComingEvents
      }
    default:
      return state
  }
}

export default appReducer
