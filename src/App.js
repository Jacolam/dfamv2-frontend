import React from 'react';
// import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LogInPage from './Pages/LogInPage.js';
import SignUpPage from './Pages/SignUpPage.js';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import ContactsPage from './Pages/ContactsPage';
import SearchPage from './Pages/SearchPage';
// import SettingPage from './Pages/SettingPage.js';
// import SettingPage from './Pages/SettingPage';
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <Container>
      <Switch>
        <Route path='/login' component={LogInPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/main' component={HomePage}/>
        <Route path='/events' component={EventsPage}/>
        <Route path='/contacts' component={ContactsPage}/>
        // <Route path='/settings' component={SettingPage}/>
        <Route path='/search' component={SearchPage}/>
        <Route path='/' component={LogInPage}/>
      </Switch>
    </Container>
  );
}

export default App;
