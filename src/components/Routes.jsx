import React from 'react';
import { Switch} from 'react-router-dom';
import HomeRefuge from './HomeRefuge';
import HomeVeterinary from './HomeVeterinary';
import HomePerson from './HomePerson';
import MyEvents from './MyEvents';
import NewEvent from './NewEvent';
import Start from './Start';
import Events from './Events';
import EventDetail from './EventDetail'
import Profile from './Profile'
import GuardRoute from './GuardRoute'

class Routes extends React.Component {
  render(){
    return (
      <Switch>
          <GuardRoute path="/users/:username" type="private" component={Profile}></GuardRoute>
          <GuardRoute path="/events/:id" type="private" component={EventDetail}></GuardRoute>
          <GuardRoute path="/myEvents" type="private" component={MyEvents}></GuardRoute>
          <GuardRoute path="/newEvent" type="private" component={NewEvent}></GuardRoute>
          <GuardRoute path="/events" type="private" component={Events}></GuardRoute>
          <GuardRoute path="/homePerson" type="private" component={HomePerson}></GuardRoute>
          <GuardRoute path="/homeRefuge" type="private" component={HomeRefuge}></GuardRoute>
          <GuardRoute path="/homeVeterinary" type="private" component={HomeVeterinary}></GuardRoute>
          <GuardRoute exact path="/" type="public" component={Start}></GuardRoute>
      </Switch>
    );
  }
}

export default Routes;