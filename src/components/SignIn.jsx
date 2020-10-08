import React, { useState } from 'react';
import Axios from 'axios'
import md5 from 'md5';

export default function SignIn() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usertype, setUsertype] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.get("https://petbook-api.herokuapp.com/home/users/" + username)
      .then(res => {
        return res.data;
      })
      .then(Response => {
        if (Response.pasword === md5(password)) {
          setUsertype(Response.userType)
            console.log(usertype)
            window.location.href = "/home"
        } else {
          alert("Invalid password")
        }
      }).catch(Response => {
        alert("Invalid user name")
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