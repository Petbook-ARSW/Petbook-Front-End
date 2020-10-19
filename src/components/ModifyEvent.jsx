import React, { useState } from 'react';
import {updateEvent} from '../services/eventAPIClient';
import swal from 'sweetalert';

export default function ModifyEvent( {event} ) {

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
        
        updateEvent(eventUpdated)
            .then(() => {
                swal({title: "Modify event", icon:"success", text: "Event updated", timer:"5000"})
                .then( () => window.location.reload());
            }).catch(Response => {
                swal({title: "Modify event", icon:"error", text: "Fail", timer:"5000"})
            });
    }

    return (
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
    );
}