import React, { useEffect, useState } from 'react';
import NavBarCompany from './NavBarCompany';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import Goal from './Goal';

export default function EventDetail() {

    const { id } = useParams()
    const [event, setEvent] = useState({});
    const [goals, setGoals] = useState([]);

    useEffect(function () {
        Axios.get("https://petbook-api.herokuapp.com/events/" + id)
            .then(res => {
                return res.data
            })
            .then(Response => {
                setEvent(Response)
                if(!Response.donaton){
                    document.getElementById("addgoalbtn").style.display = "none";
                    document.getElementById("goalsdiv").style.display = "none";
                }
            })
            .catch(Response => { console.log(Response) })

        Axios.get("https://petbook-api.herokuapp.com/events/"+id+"/goals")
            .then(res => {
                return res.data
            })
            .then(Response => {
                setGoals(Response);
            })
            .catch(Response => {console.log(Response)})

        if ( localStorage.getItem("typeUserLogged") === "Person") {
            document.getElementById("cancelbtn").style.display = "none";
            document.getElementById("addgoalbtn").style.display = "none";
            document.getElementById("btnassist").style.visibility = "visible";
        }

    }, [id])


    const [newaddress, setNewaddress] = useState("")
    const [newdate, setNewdate] = useState("")
    const [newhour, setNewhour] = useState("")
    const [newdescription, setNewdescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        var address; var date; var hour; var description;

        if (newaddress === "") { address = event.address; } else { address = newaddress; }
        if (newdate === "") { date = event.date; } else { date = newdate; }
        if (newhour === "") { hour = event.hour; } else { hour = newhour + ":00"; }
        if (newdescription === "") { description = event.information; } else { description = newdescription; }

        const eventUpdated = {
            id: event.id,
            name: event.name,
            address: address,
            date: date,
            hour: hour,
            information: description,
            host: event.host,
            donaton: event.donaton
        }
        console.log(eventUpdated)
        Axios.post("https://petbook-api.herokuapp.com/updateEvent/events/", eventUpdated)
            .then(res => {
                return res.data;
            })
            .then(Response => {
                alert("Event updated")
                window.location.reload()
            }).catch(Response => {
                alert("ERROR")
            });

    }

    const cancelEvent = (e) => {
        e.preventDefault()
        Axios.delete("https://petbook-api.herokuapp.com/deleteEvent/events/" + id)
            .then(res => {
                return res.data;
            })
            .then(Response => {
                alert("Event canceled")
                window.location.href = "/myEvents"
            })
            .catch(Response => { alert("ERROR") })
    }

    return (
        <React.Fragment>
            <div className="adminx-container">
                <NavBarCompany></NavBarCompany>
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
                                    <button className="btn-petbook mt-2" onClick={cancelEvent} id="cancelbtn">Cancel</button>
                                    <button className="btn-petbook ml-4" data-toggle="modal" data-target="#updateEvent" id="modifybtn">Modify</button>
                                    <button className="btn-petbook ml-4" data-toggle="modal" data-target="#createGoal" id="addgoalbtn">Add Goal</button>
                                    <button className="btn-petbook ml-4" id="btnassist" style={{visibility:"hidden"}}>Assist</button>
                                </div>
                            </nav>
                        </div>
                        <div className="row mt-4">
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
                                            <Goal id={singleGoal.id} value={singleGoal.value} prize={singleGoal.prize}/>)
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
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div className="modal-body">

                                <h4><strong>{event.name}</strong></h4>
                                <div className="input-text mt-4">
                                    <h6>{event.address}</h6>
                                    <input type="text" className="form-control" placeholder="Address" name="New address"
                                        onChange={(e) => setNewaddress(e.target.value)}></input>
                                </div>
                                <div className="input-text mt-4">
                                    <h6>{event.date}</h6>
                                    <input type="date" className="form-control mt-2" placeholder="Date" name="New date"
                                        onChange={(e) => setNewdate(e.target.value)}></input>
                                </div>
                                <div className="input-text mt-4">
                                    <h6>{event.hour}</h6>
                                    <input type="time" className="form-control mt-2" placeholder="Hour" name="New hour"
                                        onChange={(e) => setNewhour(e.target.value)}></input>
                                </div>
                                <div className="input-text mt-4">
                                    <h6>{event.information}</h6>
                                    <textarea type="text" className="form-control mt-2" placeholder="Information" name="New information"
                                        onChange={(e) => setNewdescription(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-petbook">Save</button>
                            </div>
                        </form>
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
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <h4 className="mb-4"><strong>{event.name}</strong></h4>
                                <input type="text" className="form-control mt-3" placeholder="Goal value" name="New address"
                                    onChange=""></input>
                                <input type="text" className="form-control mt-2" placeholder="Prize" name="New date"
                                    onChange=""></input>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-petbook">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}