import React from 'react';
import Event from './Event';
import NavBarCompany from './NavBarCompany';

export default function MyEvents() {
  return (
    <div className="adminx-container">
      <NavBarCompany></NavBarCompany>
      <div className="adminx-content" id="new">
        <div className="adminx-main-content">
          <div className="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol className="breadcrumb adminx-page-breadcrumb">
                <li className="breadcrumb-item"><a href="/home">Home</a></li>
                <li className="breadcrumb-item"><a href="/events">Events</a></li>
                <li className="breadcrumb-item active" aria-current="page">My events</li>
              </ol>
            </nav>
            <div className="pb-3">
              <h1>My Events</h1>
            </div>
          </div>
          <div className="row mt-4 ml-2"><Event></Event></div>
        </div>
      </div>
    </div>
  );
}