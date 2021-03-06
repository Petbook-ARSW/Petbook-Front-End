import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import {postEvent} from '../services/eventAPIClient';
import swal from 'sweetalert';


export default function NewEvent() {

  const [eventname, setEventname] = useState("")
  const [address, setAddress] = useState("")
  const [date, setDate] = useState("")
  const [hour, setHour] = useState("")
  const [description, setDescription] = useState("")
  const [donaton, setDonaton] = useState(false)

  useEffect(function(){
    if(localStorage.getItem("typeUserLogged") === "Veterinary"){
      document.getElementById("isDonaton").style.display = "none";
    }
    let today = new Date();
    let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    document.getElementById("date").setAttribute('min', tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const event = {
      name: eventname,
      address: address,
      date: date,
      hour: hour+":00",
      information: description,
      host: localStorage.getItem('userId'),
      donaton: donaton
    }
    postEvent(event)
    .then(() => {
      swal({title: "Register event", icon:"success", text: "Event registered", timer:"5000"})
          .then( () => window.location.href = "/myEvents");
    }).catch(() => {
        swal({title: "Register event", icon:"error", text: "Fail", timer:"5000"})
    });

  }

  return (
    <div className="adminx-container">
      <NavBar />
      <div className="adminx-content">
        <div className="adminx-main-content">
          <div className="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb adminx-page-breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/events">Events</a></li>
                <li className="breadcrumb-item active" aria-current="page">New event</li>
              </ol>
            </nav>
            <div className="pb-3">
              <h1>New Event</h1>
            </div>
            <div className="row">
            </div>
          </div>
          <div className="row mt-4 ml-2">
            <div className="col-lg-5">
              <div className="card mb-grid">
                <div className="card-header text-center">
                  <h5> Event information</h5>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                  <input type="text" className="form-control mt-2" placeholder="Event name" name="eventName" required
                    onChange={(e) => setEventname(e.target.value)}></input>

                  <input type="text" className="form-control mt-2" placeholder="Address" name="address" required
                    onChange={(e) => setAddress(e.target.value)}></input>

                  <input type="date" className="form-control mt-2" placeholder="Date" name="date" id="date" required
                    onChange={(e) => setDate(e.target.value)}></input>

                  <input type="time" className="form-control mt-2" placeholder="Hour" name="hour" aria-required
                    onChange={(e) => setHour(e.target.value)}></input>

                  <textarea type="text" className="form-control mt-2" placeholder="Description" name="information" required
                    onChange={(e) => setDescription(e.target.value)}></textarea>

                  <div className="form-check form-check-inline ml-2 mt-4" id="isDonaton">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" name="isdonaton"
                      onChange={(e) => setDonaton(!donaton)}></input>

                    <label className="form-check-label ml-2" htmlFor="inlineCheckbox2">Donaton</label>
                  </div>
                  <button type="submit" className="btn-petbook btn-block mt-4">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}