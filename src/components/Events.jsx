import React from 'react';
import NavBarCompany from './NavBarCompany';

export default function MyEvents() {
  return (
    <div className="adminx-container">
      <NavBarCompany></NavBarCompany>
      <div className="adminx-content" id="new">
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb adminx-page-breadcrumb">
            <li className="breadcrumb-item"><a href="/home">Home</a></li>
            <li className="breadcrumb-item active"><a href="/events">Events</a></li>
          </ol>
        </nav>
        <div className="pb-3">
          <h1>Events</h1>
        </div>
      </div>
    </div>
  );
}