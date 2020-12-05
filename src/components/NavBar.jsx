import React, { useEffect } from 'react';
import MenuCompany from './MenuCompany';
import MenuPerson from './MenuPerson';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function NavBar(){

  var notifications = [];

  useEffect(function () {
    let socket = new SockJS('https://petbook-api.herokuapp.com/notificationSocket');
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(`/topic/notification/${ localStorage.getItem("userId") }`, function (eventbody) {
        notifications.push(JSON.parse(eventbody.body));
        document.getElementById("numNotifications").style.visibility = "visible";
      });
    });
  }, [notifications])

  const signOut = (e) =>{
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('typeUserLogged');
    localStorage.removeItem('userName');
    window.location.href = "/";
  }

  const viewNotifications = () =>{
    document.getElementById("numNotifications").style.visibility = "hidden";
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
              <a className="nav-link nav-link-notifications" id="dropdownNotifications" data-toggle="dropdown" onClick={viewNotifications} href="/">
                <i className="display-inline-block align-middle mt-1"><img className= "menu-item" src=" /ico/bone.png" alt="notification"></img></i>
                <span className="nav-link-notification-number" id="numNotifications" style={{visibility:"hidden"}}></span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-notifications" aria-labelledby="dropdownNotifications">
                <div className="notifications-header d-flex justify-content-between align-items-center">
                  <span className="notifications-header-title">
                    Notifications
                  </span>
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