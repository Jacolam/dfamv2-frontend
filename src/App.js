import React from 'react';
// import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LogInPage from './Pages/LogInPage.js';
import SignUpPage from './Pages/SignUpPage.js';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import ContactsPage from './Pages/ContactsPage';
import ContactPage from './Pages/ContactPage';
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
        <Route path='/contact-page' component={ContactPage}/>
      </Switch>
    </Container>
  );
}

export default App;
