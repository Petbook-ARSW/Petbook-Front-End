import React, {useEffect, useState} from 'react';
import Event from './Event';
import NavBarCompany from './NavBarCompany';
import Axios from 'axios';

export default function MyEvents() {

  var [myevents, setMyevents] = useState([])

  useEffect(function(){
    Axios.get("https://petbook-api.herokuapp.com/host/events/"+ localStorage.getItem('userId'))
      .then(res => {
        return res.data;
      })
      .then(Response => setMyevents(Response))
  }, [])

  return (
    <div className="adminx-container">
      <NavBarCompany></NavBarCompany>
      <div className="adminx-content" id="new">
        <div className="adminx-main-content">
          <div className="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb adminx-page-breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/events">Events</a></li>
                <li className="breadcrumb-item active" aria-current="page">My events</li>
              </ol>
            </nav>
            <div className="pb-3">
              <h1>My Events</h1>
            </div>
          </div>
          <div className="row mt-4 ml-2">{
            myevents.map(singleEvent => 
                <Event name= {singleEvent.name}
                  id={singleEvent.id}
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