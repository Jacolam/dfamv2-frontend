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
      return {
        ...state,
        contacts: action.contacts
      }
    case 'SET_EVENTS':
      // const eventsCopy = action.events
      return {
        ...state,
        events: action.events
      }
    case 'SET_LOGS':
    // need to combine all the logs that i created, and all the logs that people have created for me
      const logsCopy = action.logs.concat(action.inverse_logs)
      return {
        ...state,
        logs: logsCopy
      }
    case 'SET_UNADDED':
      return {
        ...state,
        people: action.unadded
      }
    case 'SHOW_CONTACT':
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
      const contactsCopy = [...state.contacts, action.user]
      return {...state,
        contactsCopy
      }
    case 'REMOVE_USER_FROM_PEOPLE':
      const peopleCopy = state.people.filter((person)=>{
        return person.username !== action.user.username
      })
      return {
        ...state,
        people: peopleCopy
      }
    case 'REMOVE_CONTACT':
      const rcontactCopy = state.contacts.filter((contact)=>{
        // debugger
        return contact.contactee.id !== action.contact.id
      })
      return {
        ...state,
        contacts: rcontactCopy
      }
    // case 'SET_UPCOMING_CALLS':
    //   const upComingCalls = action.upcoming.filter((upcoming)=>{
    //     return upcoming.log_type === true
    //   })
    //   return {
    //     ...state,
    //     upComingCalls: upComingCalls
    //   }
    // case 'SET_UPCOMING_EVENTS':
    //   const upComingEvents = action.upcoming.filter((upcoming)=>{
    //     return upcoming.log_type === false
    //   })
    //   return {
    //     ...state,
    //     upComingEvents: upComingEvents
    //   }
    case 'CHANGE_STATUS':

      const newLogs = state.logs.filter((call)=>{
        return call.id !== action.log.id
      })
      newLogs.push(action.log)
      return {
      ...state,
      logs: newLogs
      }
    // case 'CHANGE_CALL':
    //
    //   const upComingCallsCopy = state.upComingCalls.filter((call)=>{
    //     return call.id !== action.log.id
    //   })
    //   upComingCallsCopy.push(action.log)
    //   console.log('after',action.log)
    //
    //   return {
    //     ...state,
    //     upComingCalls: upComingCallsCopy
    //   }
    // case 'CHANGE_MEET':
    //
    //   const upComingEventsCopy = state.upComingEvents.filter((call)=>{
    //     return call.id !== action.log.id
    //   })
    //   upComingEventsCopy.push(action.log)
    //   console.log('after',action.log)
    //
    //   return {
    //     ...state,
    //     upComingEvents: upComingEventsCopy
    //   }
    default:
      return state
  }
}

export default appReducer
