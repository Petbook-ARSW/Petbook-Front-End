import React, { useState } from 'react';
import {postGoal} from '../services/eventAPIClient';
import swal from 'sweetalert';


export default function NewGoal({ idEvent, eventname }) {

    const [value, setValue] = useState("")
    const [prize, setPrize] = useState("")

    const handleSubmit = (e) => {

        e.preventDefault()
        const goal = {
          donationId: idEvent,
          prize: prize,
          state: false,
          valor: value,
        }
        console.log(goal)
    
        postGoal(goal, idEvent)
          .then(() => {
            swal({title: "Register goal", icon:"success", text: "Goal registered", timer:"5000"})
                .then( () => window.location.reload());
          }).catch(() => {
              swal({title: "Register goal", icon:"error", text: "Fail", timer:"5000"})
          });
    }

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="modal-body">
                <h4 className="mb-4"><strong>{eventname}</strong></h4>
                <input type="text" className="form-control mt-3" placeholder="Goal value" name="New address" required
                    onChange={(e) => setValue(e.target.value)}></input>
                <input type="text" className="form-control mt-2" placeholder="Prize" name="New date"
                    onChange={(e) => setPrize(e.target.value)}></input>
            </div>
            <div className="modal-footer">
                <button className="btn-petbook">Save</button>
            </div>
        </form>
    );
}