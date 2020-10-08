import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeRefuge from './HomeRefuge';
import MyEvents from './MyEvents';
import NewEvent from './NewEvent';
import Start from './Start';
import Events from './Events';

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/" component={Start}></Route>
        <Route exact path="/home" component={HomeRefuge}></Route>
        <Route exact path="/myEvents" component={MyEvents}></Route>
        <Route exact path="/newEvent" component={NewEvent}></Route>
        <Route exact path="/events" component={Events}></Route>
    </Switch>
  );
}