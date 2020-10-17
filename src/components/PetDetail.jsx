import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import {getPetById, removePet} from '../services/petAPIClient';
import ModifyPet from './ModifyPet';
import swal from 'sweetalert';

export default function EventDetail() {

    const { id } = useParams()
    const [pet, setPet] = useState({});

    useEffect(function () {
        getPetById(id)
            .then(Response => {
                setPet(Response)
            })
            .catch(Response => { console.log(Response) });
    }, [id])    
    
    const deletePet = (e) =>{
        e.preventDefault()
        swal({title: "Delete pet", icon:"warning", text: "Are you sure?", timer:"10000",
        buttons: ["NO", "YES"]})
        .then( res => {
            if (res){ 
                removePet(id)
                    .then(() => {
                        swal({title: "Delete pet", icon:"success", text: "Pet deleted", timer:"5000"})
                            .then( () =>  window.location.href = "/myPets");
                    })
                    .catch(() => {
                        swal({title: "Delete pet", icon:"error", text: "Fail", timer:"5000"})
                    })
            }
        });
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
                                    <h1>{pet.petname}</h1>
                                    <div className="row ml-1 mt-3 align-items-start">
                                        <h6>Owner: <a href="/users/angipaola10" className="a-white">angipaola10</a></h6>
                                    </div>
                                    <button className="btn-petbook mt-2 mr-4" id="deletebtn" onClick={deletePet}>Delete</button>
                                    <button className="btn-petbook mr-4" data-toggle="modal" data-target="#updatePet" id="modifybtn">Modify</button>
                                </div>
                            </nav>
                        </div>
                        <div className="row mt-4 ml-1">
                            <div className="col-lg-5">
                                <div className="card mb-grid">
                                    <div className="card-header text-center">
                                        <h5> Pet detail</h5>
                                    </div>
                                    <div className="p-4">
                                        <h6 className="mt-3"><strong>Pet name: </strong>{pet.petname}</h6>
                                        <h6 className="mt-3"><strong>Birthdate: </strong>{pet.birthdate}</h6>
                                        <h6 className="mt-5"><strong>Information</strong>
                                            <p className="mt-1">{pet.information}</p>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="updatePet" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modify pet</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                       <ModifyPet pet={pet}/> 
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}