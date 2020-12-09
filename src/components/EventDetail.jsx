import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import Goal from './Goal';
import { getEventById, getGoalsOfEvent, cancelEventById, getParticipantsOfEvent } from '../services/eventAPIClient';
import { postParticipation, removeParticipation, getUserById } from '../services/userAPIClient';
import NewGoal from './NewGoal';
import ModifyEvent from './ModifyEvent';
import swal from 'sweetalert';
import User from './User';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import DonatonDetail from './DonatonDetail';

export default function EventDetail() {

    const { id } = useParams()
    const [event, setEvent] = useState({});
    const [goals, setGoals] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [host, setHost] = useState();
    const [hostid, setHostid] = useState();

    useEffect(function () {
        getEventById(id)
            .then(Response => {
                setEvent(Response);
                let eventDate = new Date(Response.date.split("-")[0], Response.date.split("-")[1] - 1, Response.date.split("-")[2]);
                if (eventDate.getTime() > new Date().getTime()) {
                    if (Response.host.toString() === localStorage.getItem("userId")){
                        document.getElementById("actionsEvent").style.display = "inline";
                        document.getElementById("goalsdiv").style.visibility = "visible";
                    }
                    if (localStorage.getItem("typeUserLogged") === "Person") {
                        document.getElementById("cancelbtn").style.display = "none";
                        document.getElementById("addgoalbtn").style.display = "none";
                        document.getElementById("modifybtn").style.display = "none";
                    }
                }else{

                }   
            })
            .catch((Response) => { console.log(Response) });



        getEventById(id)
            .then(Response => {
                setEvent(Response);
                if (!Response.donaton) {
                    document.getElementById("addgoalbtn").style.display = "none";
                    document.getElementById("goalsdiv").style.display = "none";
                }
                let eventDate = new Date(Response.date.split("-")[0], Response.date.split("-")[1] - 1, Response.date.split("-")[2]);
                if (eventDate.getTime() > new Date().getTime()) {
                    if (Response.host.toString() === localStorage.getItem("userId")){
                        document.getElementById("actionsEvent").style.display = "inline";
                        document.getElementById("goalsdiv").style.visibility = "visible";
                    }
                    if (localStorage.getItem("typeUserLogged") === "Person") {
                        document.getElementById("cancelbtn").style.display = "none";
                        document.getElementById("addgoalbtn").style.display = "none";
                        document.getElementById("modifybtn").style.display = "none";  
                    }
                }

                getParticipantsOfEvent(id)
                    .then(Response => {
                        setParticipants(Response);
                        if (localStorage.getItem("typeUserLogged") === "Person" && eventDate > new Date().getTime()){
                            if (Response.filter( ({iduser}) => iduser.toString() === localStorage.getItem('userId')).length > 0){
                                document.getElementById("btnnoassist").style.display = "inline";
                            }else{
                                document.getElementById("btnassist").style.display = "inline";
                            }
                        }
                    }).catch(() => {
                        if (localStorage.getItem("typeUserLogged") === "Person" && eventDate > new Date().getTime()){
                            document.getElementById("btnassist").style.display = "inline";
                        }
                        setParticipants([])
                    });

                getUserById(Response.host)
                    .then(({id,userName}) => {
                        setHost(userName);
                        setHostid(id);
                    });
            })
            .catch((Response) => { console.log(Response) });

        getGoalsOfEvent(id)
            .then(Response => {
                setGoals(Response);
            }).catch(() => setGoals([]));

        

    }, [id])

    const cancelEvent = (e) => {
        e.preventDefault()
        swal({
            title: "Cancel event", icon: "warning", text: "Are you sure?", timer: "10000",
            buttons: ["NO", "YES"]
        })
            .then(res => {
                if (res) {
                    cancelEventById(id)
                        .then(() => {
                            swal({ title: "Cancel event", icon: "success", text: "Event canceled", timer: "5000" })
                                .then(() => window.location.href = "/myEvents");
                        })
                        .catch(() => {
                            swal({ title: "Cancel event", icon: "error", text: "Fail", timer: "5000" })
                        })
                }
            });
    }

    const assistEvent = (e) => {
        e.preventDefault(e);
        postParticipation(id, localStorage.getItem("userId"))
            .then(() =>  {
                sendNotification();
            });
    }

    const sendNotification = () => {
        var socket = new SockJS('https://petbook-api.herokuapp.com/notificationSocket');
        var stompClient = Stomp.over(socket);
        var notification = {
            description: "hola",
            userid: hostid
        }
        stompClient.connect({}, function (frame) {
            stompClient.send(`/app/notification/${hostid}`, {}, JSON.stringify(notification));
            window.location.reload();
        });
    }

    const noAssistEvent = (e) => {
        e.preventDefault(e);
        removeParticipation(id, localStorage.getItem("userId"))
            .then(() =>  window.location.reload());
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
                                    <div id="actionsEvent" style={{ display: "none" }}>
                                        <button className="btn-petbook mt-2 mr-4" onClick={cancelEvent} id="cancelbtn">Cancel</button>
                                        <button className="btn-petbook mr-4" data-toggle="modal" data-target="#updateEvent" id="modifybtn">Modify</button>
                                        <button className="btn-petbook mr-4" data-toggle="modal" data-target="#createGoal" id="addgoalbtn">Add Goal</button>
                                    </div>
                                    <button className="btn-petbook" id="btnassist" onClick={assistEvent} style={{ display: "none" }}>Assit</button>
                                    <button className="btn-petbook" id="btnnoassist" onClick={noAssistEvent} style={{ display: "none" }}>No Assit</button>
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
                                        <h6><strong>This event starts in ...</strong></h6> 
                                        <button className="btn-invisible mt-3" data-toggle="modal" data-target="#participants" id="btnparticipants">{participants.length} Participants</button>
                                        <h6 className="mt-3"><strong>Host company: <a className="a-white" href={"/users/"+host}>{host}</a></strong></h6>
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
                            <DonatonDetail idEvent={id} idHost={hostid} ></DonatonDetail>
                        </div>
                        <div className="row ml-1" id="goalsdiv" style={{ visibility: "hidden" }}>
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
                        <ModifyEvent event={event} />
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
            <div className="modal fade" id="participants" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Participants</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="p-4">{
                            participants.map(participant =>
                                <User iduser={participant.iduser}></User>
                            )
                        }</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}