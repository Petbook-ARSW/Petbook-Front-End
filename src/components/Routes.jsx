import React from 'react';
import { Switch} from 'react-router-dom';
import Home from './Home';
import MyEvents from './MyEvents';
import NewEvent from './NewEvent';
import Start from './Start';
import EventDetail from './EventDetail';
import Profile from './Profile';
import GuardRoute from './GuardRoute';
import NewPet from './NewPet';
import MyPets from './MyPets';
import Events from './Events';
import PetDetail from './PetDetail';
import PostDetail from './PostDetail';

class Routes extends React.Component {
  render(){
    return (
      <Switch>
          <GuardRoute path="/users/:username" type="private" component={Profile}></GuardRoute>
          <GuardRoute path="/posts/:id" type="private" component={PostDetail}></GuardRoute>
          <GuardRoute path="/events/:id" type="private" component={EventDetail}></GuardRoute>
          <GuardRoute path="/pets/:id" type="private" component={PetDetail}></GuardRoute>
          <GuardRoute path="/myPets" type="private" component={MyPets}></GuardRoute>
          <GuardRoute path="/myEvents" type="private" component={MyEvents}></GuardRoute>
          <GuardRoute path="/newEvent" type="private" component={NewEvent}></GuardRoute>
          <GuardRoute path="/newPet" type="private" component={NewPet}></GuardRoute>
          <GuardRoute path="/events" type="private" component={Events}></GuardRoute>
          <GuardRoute path="/home" type="private" component={Home}></GuardRoute>
          <GuardRoute exact path="/" type="public" component={Start}></GuardRoute>
      </Switch>
    );
  }
}

export default Routes;