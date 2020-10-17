import React from 'react';

export default function MenuPerson() {

  return (
    <>
      <div className="adminx-sidebar expand-hover push">
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <a href="/" className="sidebar-nav-link active">
              <span className="sidebar-nav-icon menu-ico">
                <i data-feather="home"><img className="menu-item" src="/ico/home.png" alt="home"></img></i>
              </span>
              <span className="sidebar-nav-name ml-3">
                Home
              </span>
            </a>
          </li>
          <li className="sidebar-nav-item">
            <a className="sidebar-nav-link collapsed" data-toggle="collapse" href="#eventsOptions" aria-expanded="false" aria-controls="example">
              <span className="sidebar-nav-icon">
                <i data-feather="pie-chart"><img className="menu-item" src="/ico/event.png" alt="Events"></img></i>
              </span>
              <span className="sidebar-nav-name ml-3">
                Events
              </span>
              <span className="sidebar-nav-end">
                <i data-feather="chevron-right" className="nav-collapse-icon"></i>
              </span>
            </a>

            <ul className="sidebar-sub-nav collapse ml-4" id="eventsOptions">
              <li className="sidebar-nav-item">
                <a href="/newEvent" className="sidebar-nav-link" data-feather="newevent">
                  <span className="sidebar-nav-name">
                    <img className="menu-item mr-2" src="/ico/addEvent.png" alt="new event"></img>
                          New event
                  </span>
                </a>
              </li>

              <li className="sidebar-nav-item">
                <a href="/myEvents" className="sidebar-nav-link">
                  <span className="sidebar-nav-name">
                    <img className="menu-item mr-2" src="/ico/myEvents.png" alt="my events"></img>
                     My events
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>

  );
}