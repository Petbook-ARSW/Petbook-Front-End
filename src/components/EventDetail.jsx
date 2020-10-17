import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import Goal from './Goal';
import {getEventById, getGoalsOfEvent, cancelEventById} from '../services/eventAPIClient';
import NewGoal from './NewGoal';
import ModifyEvent from './ModifyEvent';
import swal from 'sweetalert';


export default function EventDetail() {

    const { id } = useParams()
    const [event, setEvent] = useState({});
    const [goals, setGoals] = useState([]);

    useEffect(function () {
        getEventById(id)
            .then(Response => {
                setEvent(Response)
                if(!Response.donaton){
                    document.getElementById("addgoalbtn").style.display = "none";
                    document.getElementById("goalsdiv").style.display = "none";
                }
            })
            .catch(Response => { console.log(Response) });
        
        getGoalsOfEvent(id)
            .then(Response => {
                setGoals(Response);
            })
            .catch(Response => {console.log(Response)});

        if ( localStorage.getItem("typeUserLogged") === "Person") {
            document.getElementById("cancelbtn").style.display = "none";
            document.getElementById("addgoalbtn").style.display = "none";
            document.getElementById("modifybtn").style.display = "none";
            document.getElementById("btnassist").style.visibility = "visible";
        }

    }, [id])    

    const cancelEvent = (e) => {
        e.preventDefault()
        swal({title: "Cancel event", icon:"warning", text: "Are you sure?", timer:"10000",
        buttons: ["NO", "YES"]})
        .then( res => {
            if (res){ 
                cancelEventById(id)
                    .then(() => {
                        swal({title: "Cancel event", icon:"success", text: "Event canceled", timer:"5000"})
                            .then( () =>  window.location.href = "/myEvents");
                    })
                    .catch(() => {
                        swal({title: "Cancel event", icon:"error", text: "Fail", timer:"5000"})
                    })
            }
        });
    }

    const assistEvent = (e) => {
        e.preventDefault(e);
    }

    return (
        <React.Fragment>
            <div className="adminx-container">
                <NavBar />
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav className="nav background-white ">
                                <div className="adminx-main-content">
                                    <h1>{event.name}</h1>
                                    <div className="row ml-1 mt-3">
                                        <h6>Date: {event.date}</h6>
                                        <h6 className="ml-5">Hour: {event.hour}</h6>
                                    </div>
                                    <button className="btn-petbook mt-2 mr-4" onClick={cancelEvent} id="cancelbtn">Cancel</button>
                                    <button className="btn-petbook mr-4" data-toggle="modal" data-target="#updateEvent" id="modifybtn">Modify</button>
                                    <button className="btn-petbook mr-4" data-toggle="modal" data-target="#createGoal" id="addgoalbtn"s>Add Goal</button>
                                    <button className="btn-petbook" id="btnassist" onClick={assistEvent} style={{visibility:"hidden"}}>Assit</button>
                                    <button className="btn-petbook" id="btnnoassist" style={{visibility:"hidden"}}>No Assit</button>
                                </div>
                            </nav>
                        </div>
                        <div className="row mt-4 ml-1">
                            <div className="col-lg-5">
                                <div className="card mb-grid">
                                    <div className="card-header text-center">
                                        <h5> Event detail</h5>
                                    </div>
                                    <div className="p-4">
                                        <h6 className="mt-3"><strong>Event name: </strong>{event.name}</h6>
                                        <h6 className="mt-3"><strong>Date: </strong>{event.date}</h6>
                                        <h6 className="mt-3"><strong>Hour: </strong>{event.hour}</h6>
                                        <h6 className="mt-3"><strong>Address: </strong>{event.address}</h6>
                                        <h6 className="mt-5"><strong>Information</strong>
                                            <p className="mt-1">{event.information}</p>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="goalsdiv">
                            <div className="col-lg-5">
                                <div className="card mb-grid">
                                    <div className="card-header text-center">
                                        <h5> Donaton goals</h5>
                                    </div>
                                    <div className="p-4">{
                                        goals.map(singleGoal => 
                                            <Goal goal={singleGoal} />)
                                    }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="updateEvent" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modify event</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                       <ModifyEvent event={event}/> 
                    </div>
                </div>
            </div>
            <div className="modal fade" id="createGoal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add goal</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <NewGoal idEvent={event.id} eventname={event.name} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}