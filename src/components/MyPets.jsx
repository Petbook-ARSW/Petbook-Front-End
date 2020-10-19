import React, {useEffect, useState} from 'react';
import Pet from './Pet';
import NavBar from './NavBar';
import {getPetsByIdPerson} from '../services/petAPIClient';

export default function MyPets() {

  const [mypets, setMypets] = useState([])

  useEffect(function(){
    getPetsByIdPerson(localStorage.getItem('userId'))
        .then(res => setMypets(res))
        .catch( () => setMypets([]));
  }, [])

  return (
    <div className="adminx-container">
      <NavBar />
      <div className="adminx-content">
        <div className="adminx-main-content">
          <div className="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb adminx-page-breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/events">Pets</a></li>
                <li className="breadcrumb-item active" aria-current="page">My pets</li>
              </ol>
            </nav>
            <div className="pb-3">
              <h1>My Pets</h1>
            </div>
          </div>
          <div className="row mt-4 ml-2">{
            mypets.map(singlePet => 
                <Pet
                  id={singlePet.id}
                  name={singlePet.petname}
                  birthdate={singlePet.birthdate}
                  information={singlePet.information}>
                </Pet>)
          }</div>
        </div>
      </div>
    </div>
  );
}