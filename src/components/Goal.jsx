import React from 'react';
import {removeGoal} from '../services/eventAPIClient';
import swal from 'sweetalert';

export default function Goal( {goal} ) {

    const deleteGoal = (e) => {
        e.preventDefault();

        swal({title: "Delete goal", icon:"warning", text: "Are you sure?", timer:"10000",
        buttons: ["NO", "YES"]})
        .then( res => {
            if (res){ 
                removeGoal(goal.id)
                    .then(() => {
                        swal({title: "Delete goal", icon:"success", text: "Goal deleted", timer:"5000"})
                            .then( () =>  window.location.reload());
                    })
                    .catch(() => {
                        swal({title: "Delete goal", icon:"error", text: "Fail", timer:"5000"})
                    })
            }
        });
    }

    return (
        <React.Fragment>
            <div className="row align-items-start">
                <button className="btn-invisible" onClick={deleteGoal}>Del</button>
                <h5 className="col-3"><strong>$ {goal.valor}</strong></h5>
                <p className="col-7">{goal.prize}</p>
            </div>
        </React.Fragment>
    );
}