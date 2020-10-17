import React, {useState} from 'react';
import NavBar from './NavBar';
import {postPet} from '../services/petAPIClient';
import swal from 'sweetalert';


export default function NewEvent() {

  const [petname, setPetname] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [information, setInformation] = useState("")
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const pet ={
      idowner: localStorage.getItem("userId"),
      petname: petname,
      birthdate: birthdate,
      information: information
    }

    postPet(pet)
      .then(() => {
        swal({title: "Register pet", icon:"success", text: "Pet registered", timer:"5000"})
            .then( () => window.location.href = "/myPets");
      }).catch(() => {
          swal({title: "Register pet", icon:"error", text: "Fail", timer:"5000"})
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
                <li className="breadcrumb-item"><a href="/">Pets</a></li>
                <li className="breadcrumb-item active" aria-current="page">New pet</li>
              </ol>
            </nav>
            <div className="pb-3">
              <h1>New Pet</h1>
            </div>
            <div className="row">
            </div>
          </div>
          <div className="row mt-4 ml-2">
            <div className="col-lg-5">
              <div className="card mb-grid">
                <div className="card-header text-center">
                  <h5> Pet information</h5>
                </div>
                <form className="p-4" onSubmit={handleSubmit}>
                  <input type="text" className="form-control mt-2" placeholder="Pet name" name="eventName" required
                    onChange={(e) => setPetname(e.target.value)}></input>
                  <input type="date" className="form-control mt-2" placeholder="Birthdate" name="date" required
                    onChange={(e) => setBirthdate(e.target.value)}></input>
                  <textarea type="text" className="form-control mt-2" placeholder="Information" name="information" required
                    onChange={(e) => setInformation(e.target.value)}></textarea>
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