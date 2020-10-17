import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import md5 from 'md5';
import NavBar from './NavBar';
import swal from 'sweetalert';;

export default function Profile() {

    const { username } = useParams()
    const [user, setUser] = useState({});

    useEffect(function () {
        Axios.get("https://petbook-api.herokuapp.com/users/" + username)
            .then(res => {
                return res.data
            })
            .then(Response => setUser(Response))
            .catch(Response => { console.log(Response) })
    }, [username])

    const [newemail, setNewemail] = useState("")
    const [newphone, setNewphone] = useState("")
    const [newinformation, setNewinformation] = useState("")
    const [newpassword, setNewpassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        var email; var phone; var info; var password;

        if(newemail === ""){ email = user.mail;}else{email = newemail;}
        if(newphone === ""){ phone = user.numberPhone;}else{phone = newphone;}
        if(newinformation === ""){ info = user.information;}else{info = newinformation;}
        if(newpassword === ""){ password = user.pasword;}else{password = md5(newpassword);}

        const profileUpdated = {
            id: user.id,
            userName: user.userName,
            pasword: password,
            userType: user.userType,
            mail: email,
            numberPhone: phone,
            information: info,
            birthdate: user.birthdate
          }

          Axios.post("https://petbook-api.herokuapp.com/users/changeUser", profileUpdated)
            .then(res => {
              return res.data;
            })
            .then(Response => {
                swal({title: "Edit profile", icon:"success", text: "Profile updated", timer:"5000"})
                    .then( () => window.location.reload());
            }).catch(Response => {
                swal({title: "Edit profile", icon:"error", text: "fail", timer:"5000"})
                    .then( () => window.location.reload());
            });

    }

    return (
        <React.Fragment>
            <div className="adminx-container">
                <NavBar />
                <div className="adminx-content">
                    <div className="adminx-main-content">
                        <div className="container-fluid">
                            <nav className="nav background-white ">
                                <div className="adminx-main-content">
                                    <h1>{user.userName}</h1>
                                    <h5>{user.userType}</h5>
                                    <button className="btn-petbook mt-2" data-toggle="modal" data-target="#createFunction">Edit profile</button>
                                </div>
                            </nav>
                        </div>
                        <div className="row mt-4 ml-2">
                            <div className="col-lg-5">
                                <div className="card mb-grid">
                                    <div className="card-header text-center">
                                        <h5>Profile detail</h5>
                                    </div>
                                    <div className="p-4">
                                        <h6 className="mt-3"><strong>Email:</strong>{user.mail}</h6>
                                        <h6 className="mt-3"><strong>Number phome: </strong>{user.numberPhone}</h6>
                                        <h6 className="mt-3"><strong>Birthdate: </strong>{user.birthdate}</h6>
                                        <h6 className="mt-5"><strong>Information: </strong>{user.information}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="createFunction" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit profile</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <h4><strong>{user.userName}</strong></h4>
                                <div className="input-text mt-4">
                                    <h6>{user.mail}</h6>
                                    <input type="text" className="form-control" placeholder="Email" name="New address"
                                        onChange={(e) => setNewemail(e.target.value)}></input>
                                </div>
                                <div className="input-text mt-4">
                                    <h6>{user.numberPhone}</h6>
                                    <input type="text" className="form-control mt-2" placeholder="Number phone" name="New date"
                                        onChange={(e) => setNewphone(e.target.value)}></input>
                                </div>
                                <div className="input-text mt-4">
                                    <h6>{user.information}</h6>
                                    <textarea type="text" className="form-control mt-2" placeholder="Information" name="New hour"
                                        onChange={(e) => setNewinformation(e.target.value)}></textarea>
                                </div>
                                <div className="input-text mt-4">
                                    <input type="password" className="form-control mt-2" placeholder="Password" name="New password"
                                        onChange={(e) => setNewpassword(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-petbook">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}