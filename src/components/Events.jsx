import React, {useEffect, useState} from 'react';
import Event from './Event';
import NavBar from './NavBar';
import {getAllEvents} from '../services/eventAPIClient';

export default function MyEvents() {

  var [events, setEvents] = useState([])

  useEffect(function(){
    getAllEvents()
      .then(res => setEvents(res));
  }, [])

  return (
    <div className="adminx-container">
      <NavBar />
      <div className="adminx-content" id="new">
        <div className="adminx-main-content">
          <div className="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb adminx-page-breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active"><a href="/events">Events</a></li>
              </ol>
            </nav>
            <div className="pb-3">
              <h1>Events</h1>
            </div>
          </div>
          <div className="row mt-4 ml-2">{
            events.map(singleEvent => 
                <Event name= {singleEvent.name}
                  idEvent={singleEvent.id}
                  date={singleEvent.date}
                  hour={singleEvent.hour}
                  information={singleEvent.information}>
                </Event>)
          }</div>
        </div>
      </div>
    </div>
  );
}