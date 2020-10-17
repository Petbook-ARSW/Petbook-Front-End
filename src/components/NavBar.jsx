import React from 'react';
import MenuCompany from './MenuCompany';
import MenuPerson from './MenuPerson';

export default function NavBar(){
  const signOut = (e) =>{
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('typeUserLogged');
    localStorage.removeItem('userName');
    window.location.href = "/";
  }

  return(
    <>
      { localStorage.getItem('typeUserLogged') === 'Person' ?  
        <MenuPerson id="menu"/> :
        <MenuCompany id="menu"/>
      }  
      <nav className="navbar navbar-expand justify-content-between fixed-top background-white" >
          <div className="d-flex flex-1 d-block d-md-none">
            <button className="sidebar-toggle ml-3 btn-ico">
              <i data-feather="menu"><img className= "menu-icon" src="/ico/menu.png" alt="menu"></img></i>
            </button>
          </div>
          <a className="navbar-brand mb-0 h1 d-flex" href="/">
            <img src="/logoPetbookNav.png" className="navbar-brand-image d-inline-block align-top mr-2 nav-item" alt="logo"></img>
          </a>
          <form className="form-inline  d-none d-flex mx-auto">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-icon">
                  <i data-feather="search"></i>
                </div>
              </div>
              <input type="text" className="form-control mr-3" id="search" placeholder="Type to search..."></input>
            </div>
          </form>
          <ul className="navbar-nav d-flex justify-content-end mr-2">
            <li className="nav-item dropdown d-flex align-items-center mr-2">
              <a className="nav-link nav-link-notifications" id="dropdownNotifications" data-toggle="dropdown" href="/">
                <i className="display-inline-block align-middle mt-1"><img className= "menu-item" src=" /ico/bone.png" alt="notification"></img></i>
                <span className="nav-link-notification-number">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-notifications" aria-labelledby="dropdownNotifications">
                <div className="notifications-header d-flex justify-content-between align-items-center">
                  <span className="notifications-header-title">
                    Notifications
                  </span>
                  <a href="/" className="d-flex"><small>Mark all as read</small></a>
                </div>

                <div className="list-group">
                  <a href="/" className="list-group-item list-group-item-action unread">
                    <p className="mb-1">Invitation for <strong>Lunch</strong> on <strong>Jan 12th 2018</strong> by <strong>Laura</strong></p>

                    <div className="mb-1">
                      <button type="button" className="btn btn-primary btn-sm">Accept invite</button>
                      <button type="button" className="btn btn-outline-danger btn-sm">Decline</button>
                    </div>

                    <small>1 hour ago</small>
                  </a>

                  <a href="/" className="list-group-item list-group-item-action">
                    <p className="mb-1"><strong className="text-success">Goal completed</strong><br />1,000 new members today</p>
                    <small>3 days ago</small>
                  </a>

                  <a href="/" className="list-group-item list-group-item-action">
                    <p className="mb-1 text-danger"><strong>System error detected</strong></p>
                    <small>3 days ago</small>
                  </a>

                  <a href="/" className="list-group-item list-group-item-action">
                    <p className="mb-1">Your task <strong>Design Draft</strong> is due today.</p>
                    <small>4 days ago</small>
                  </a>
                </div>

                <div className="notifications-footer text-center">
                  <a href="/"><small>View all notifications</small></a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown ml-2">
              <a className="nav-link avatar-with-name" id="navbarDropdownMenuLink" data-toggle="dropdown" href="/">
                <img src="/ico/profilepicture.png" className="d-inline-block align-top" alt="home" ></img>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href={"/users/"+localStorage.getItem('userName')}>My Profile</a>
                <a className="dropdown-item" href="/">Settings</a>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-danger" onClick={(e) => signOut()}>Sign out</button>
              </div>
            </li>
          </ul>
        </nav>
      </>
  );
}