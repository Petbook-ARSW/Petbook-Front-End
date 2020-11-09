import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {removePost} from '../services/postAPIClient';
import swal from 'sweetalert';

export default function Event({ id, iduser, img, description, date }) {

    var [username, setUsername] = useState("");

    useEffect(function () {
        Axios.get(`https://petbook-api.herokuapp.com/users/id/${iduser}`)
            .then(res => {
                return res.data;
            })
            .then(({ userName }) => {
                setUsername(userName);
            })
            .catch(() => setUsername(""));
    }, [iduser]);

    const deletePost = () => {
        swal({title: "Delete pet", icon:"warning", text: "Are you sure?", timer:"10000",
        buttons: ["NO", "YES"]})
        .then( res => {
            if (res){ 
                removePost(id)
                    .then(() => {
                        swal({title: "Delete post", icon:"success", text: "Post deleted", timer:"5000"})
                            .then( () =>  window.location.reload());
                    })
                    .catch(() => {
                        swal({title: "Delete post", icon:"error", text: "Fail", timer:"5000"})
                    })
            }
        });
    };

    return (
        <>
            <div className="card m-3" >
                <div className="card-header">
                    <div className="row" >
                        <a href={"/users/" + username} className="a-white"><strong><h5>@{username}</h5></strong></a>
                    </div>
                </div>
                <img width="100%" src={`data:image/jpeg;base64,${img}`} alt="img post"></img>
                <div className="card-footer pl-4 pr-4 pt-0 pb-0">
                    <div className="row justify-content-end">
                        <button className="btn-invisible mr-2" id="btnEdit" type="button">
                            <img className="menu-icon" src="/ico/edit.png" alt="menu"></img>
                        </button>
                        <button className="btn-invisible" id="btnDelete" type="button" onClick={deletePost}>
                            <img className="menu-icon" src="/ico/delete.png" alt="menu"></img>
                        </button>
                    </div>
                    <p id="pdescription">{description}</p>
                    <textarea style={{display: "none"}} id="newdescrip"></textarea> 
                </div>
            </div>
        </>
    );

}