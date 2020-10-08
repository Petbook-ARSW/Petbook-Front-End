import React, { useState } from 'react';
import md5 from 'md5';
import Axios from 'axios'

export default function SignUp() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [numberphone, setNumberphone] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [information, setInformation] = useState("")
  const [usertype, setUserType] = useState("Person")

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      userName: username,
      pasword: md5(password),
      userType: usertype,
      mail: email,
      numberPhone: numberphone,
      information: information,
      birthdate: birthdate
    }

    Axios.post("https://petbook-api.herokuapp.com/home/users/newUser", user)
      .then(res => {
        return res.data;
      })
      .then(Response => {
        alert("Registered user")
        window.location.href = "/"
      }).catch(Response => {
        alert("ERROR")
      });
  }

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      
      <input type="text" className="form-control mt-5" placeholder="User name" name="userName" required
            onChange={(e) => setUsername(e.target.value)}></input>

      <input type="Password" className="form-control mt-2" placeholder="Password" name="password" required
            onChange={(e) => setPassword(e.target.value)}></input>

      <input type="mail" className="form-control mt-2" placeholder="Email" required
            onChange={(e) => setEmail(e.target.value)}></input>
            
      <input type="text" className="form-control mt-2" placeholder="Number phone" name="numberPhone" required
            onChange={(e) => setNumberphone(e.target.value)}></input>

      <input type="date" className="form-control mt-2" placeholder="Birthdate" name="birthdate" required
            onChange={(e) => setBirthdate(e.target.value)}></input>

      <textarea className="form-control mt-2" placeholder="Additional Information" name="information"
            onChange={(e) => setInformation(e.target.value)}></textarea>

      <div className="row ml-3 mt-4">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked
            onChange={(e) => setUserType("Person")}></input>
          <label className="form-check-label" htmlFor="exampleRadios1">
            Person
          </label>
        </div>
        <div className="form-check ml-4">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"
           onChange={(e) => setUserType("Veterinary")}></input>
          <label className="form-check-label" htmlFor="exampleRadios2">
            Veterinary
          </label>
        </div>
      </div>

      <button type="submit" className="btn-petbook btn-block mt-4">Sign up</button>
      
    </form>
  )
}