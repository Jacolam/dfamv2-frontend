const initialState = {
  loggedIn: false,
  contacts: [],
  people: [],
  events: [],
  allContacts: true,
  detailedContact:{},
  logs: [],
  settings:{}
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
      return {
        ...state,
        events: action.events
      }
    case 'SET_LOGS':
      const logsCopy = action.logs
      // .concat(action.inverse_logs)
      return {
        ...state,
        logs: logsCopy
      }
    case 'SET_SETTINGS':
      const settings = {
        username: action.data.username,
        phone: action.data.phone,
        email: action.data.email,
        avatar: action.data.avatar,
        twitter: action.data.twitter,
        facebook: action.data.facebook
      }
      return {
        ...state,
        settings: settings
      }
    case 'UPDATE_INFO':
      const newInfo = {
        username: action.settings.username,
        phone: action.settings.phone,
        email: action.settings.email,
        avatar: action.settings.avatar,
        twitter: action.settings.twitter,
        facebook: action.settings.facebook
      }
      return {
        ...state,
        settings: newInfo
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
        return contact.contactee.id !== action.contact.id
      })
      return {
        ...state,
        contacts: rcontactCopy
      }
    case 'REMOVE_LOGS_CONTACT':
      const rLogCopy = state.logs.filter( (log)=>{
        return log.attendee_id !== action.contact.id
      })
      return {
        ...state,
        logs: rLogCopy
      }
    case 'CHANGE_STATUS':
      const newLogs = [...state.logs]
      let index = newLogs.findIndex((log) => log.id === action.log.id)
      newLogs.splice(index,1,action.log)
      return {
      ...state,
      logs: newLogs
      }
    case 'DELETE_LOG':
      const delLog = state.logs.filter((log)=>{
        return log.id !== action.log
      })
      return {
      ...state,
      logs: delLog
      }
    case 'UPDATE_LOG':
    
      const logs = state.logs.filter((log)=>{
        return action.log.id !== log.id
      })

      const updatedLogs = [...logs, action.log ]

      return {
      ...state,
      logs: updatedLogs
      }
    case 'CHANGE_IMAGE':
      const newSettings = {...state.settings, avatar: action.image}
      return {
      ...state,
      settings: newSettings
      }
    default:
      return state
  }
}

export default appReducer
