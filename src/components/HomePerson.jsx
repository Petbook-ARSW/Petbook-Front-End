import React from 'react';

export default function HomePerson() {

  const signOut = (e) =>{
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('typeUserLogged');
    window.location.href = "/";
  }

  return (
    <div className="background-petbook index-container">
      <h1>Home person</h1>
      <button  className="btn-petbook ml-3" onClick={(e) => signOut()} >Sign Out</button>
    </div>
  );
}