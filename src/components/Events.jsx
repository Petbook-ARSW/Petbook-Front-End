import React from 'react';
import NavBarCompany from './NavBarCompany';

export default function MyEvents() {
  return (
    <div className="adminx-container">
      <NavBarCompany></NavBarCompany>
      <div class="adminx-content" id="new">
        <div class="adminx-main-content">
          <div class="container-fluid">
            <nav aria-label="breadcrumb" role="navigation">
              <ol class="breadcrumb adminx-page-breadcrumb">
                <li class="breadcrumb-item"><a href="/home">Home</a></li>
                <li class="breadcrumb-item active"><a href="/events">Events</a></li>
              </ol>
            </nav>
            <div class="pb-3">
              <h1>Events</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}