import React, { useState } from 'react';
import {updatePet} from '../services/petAPIClient';
import swal from 'sweetalert';

export default function ModifyPet( {pet} ) {

    const [newinformation, setNewinformation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        var information;

        if (newinformation === "") { information = pet.information; } else { information = newinformation; }

        const petUpdated = {
            id: pet.id,
            idowner: pet.idowner,
            name: pet.petname,
            birthdate: pet.birthdate,
            information: information,
        }

        updatePet(pet.id, petUpdated)
            .then(() => {
                swal({title: "Modidy pet", icon:"success", text: "Pet updated", timer:"5000"})
                    .then( () => window.location.reload());
            }).catch(() => {
                swal({title: "Modidy pet", icon:"error", text: "Fail", timer:"5000"})
            });
    }

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="modal-body">
                <h4><strong>{pet.petname}</strong></h4>
                <div className="input-text mt-4">
                    <h6>{pet.information}</h6>
                    <textarea type="text" className="form-control mt-2" placeholder="Information" name="New information"
                        onChange={(e) => setNewinformation(e.target.value)}></textarea>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-petbook">Save</button>
            </div>
        </form>
    );
}