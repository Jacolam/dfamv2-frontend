import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LogInPage from './Pages/LogInPage.js';
import SignUpPage from './Pages/SignUpPage.js';
import HomePage from './Pages/HomePage';
import EventsPage from './Pages/EventsPage';
import ContactsPage from './Pages/ContactsPage';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/login' component={LogInPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/main' component={HomePage}/>
        <Route path='/events' component={EventsPage}/>
        <Route path='/contacts' component={ContactsPage}/>
      </Switch>
    </div>
  );
}

export default App;
