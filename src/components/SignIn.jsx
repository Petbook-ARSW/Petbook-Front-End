import React, { useState } from 'react';
import md5 from 'md5';
import {getUserByUserName} from '../services/userAPIClient';
import swal from 'sweetalert';

export default function SignIn() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    getUserByUserName(username)
      .then( ( {id, userName, pasword, userType} ) => {
        if (pasword === md5(password)) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("typeUserLogged", userType);
          localStorage.setItem("userId", id);
          localStorage.setItem("userName", userName);
          window.location.href = "/";
        } else {
          swal({title: "Sign in", icon:"error", text: "Invalid password", timer:"5000"});
        }
      })
      .catch( () => {
        swal({title: "Sign in", icon:"error", text: "Invalid user name", timer:"5000"});
      });
  }

  return (
    <React.Fragment>
      <form className="text-center" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mt-5"
          placeholder="User name"
          name="userName"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required>
        </input>

        <input
          type="Password"
          className="form-control mt-2 mb-4"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required>
        </input>
        <button type="submit" className="btn-petbook btn-block mt-4">Sign in</button>
      </form>
    </React.Fragment>
  );
}