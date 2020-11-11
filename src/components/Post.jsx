import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { removePost, getLikesOfPost, getCommentsOfPost} from '../services/postAPIClient';
import swal from 'sweetalert';

export default function Event({ id, iduser, img, description, date }) {

    var [username, setUsername] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(function () {
        Axios.get(`https://petbook-api.herokuapp.com/users/id/${iduser}`)
            .then(res => {
                return res.data;
            })
            .then(({ userName }) => {
                setUsername(userName);
            })
            .catch(() => setUsername(""));
        
        getLikesOfPost(id)
            .then(Res => {
                setLikes(Res);
            })
            .catch(() => setLikes([]));

        getCommentsOfPost(id)
            .then(Res => setComments(Res))
            .catch(() => setComments([]));
    }, [iduser, id]);

    const deletePost = () => {
        swal({
            title: "Delete pet", icon: "warning", text: "Are you sure?", timer: "10000",
            buttons: ["NO", "YES"]
        })
            .then(res => {
                if (res) {
                    removePost(id)
                        .then(() => {
                            swal({ title: "Delete post", icon: "success", text: "Post deleted", timer: "5000" })
                                .then(() => window.location.reload());
                        })
                        .catch(() => {
                            swal({ title: "Delete post", icon: "error", text: "Fail", timer: "5000" })
                        })
                }
            });
    };

    const redirectTopost = () => {
        window.location.href = `/posts/${ id }`;
    }

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
                    <div className="row mt-2">
                        <div className="col-6 p-0">{
                            likes.filter( ({iduser}) => iduser.toString() === localStorage.getItem('userId')).length > 0 ?
                                <button className="btn-invisible ml-2" id="btndislike">
                                    <img className=" background-gradient menu-icon mr-1" src="/ico/like.png" width="100%" alt="menu"></img>
                                </button>
                            :
                                <button className="btn-invisible ml-2" type="button" id="btnlike" >
                                    <img className="menu-icon mr-1" src="/ico/like.png" alt="menu"></img>
                                </button>
                        }
                        <a className="a-white" href="/">{likes.length}</a> 
                        <button className="btn-invisible ml-3" type="button">
                            <img className="menu-icon mr-1" src="/ico/comment.png" alt="menu" onClick={redirectTopost}></img>{comments.length}
                        </button>
                        </div>{username === localStorage.getItem("userName") &&
                            <div className="row col-6 justify-content-end m-0">
                                <button className="btn-invisible mr-2" id="btnEdit" type="button" onClick={redirectTopost}>
                                    <img className="menu-icon" src="/ico/edit.png" alt="menu"></img>
                                </button>
                                <button className="btn-invisible" id="btnDelete" type="button" onClick={deletePost}>
                                    <img className="menu-icon" src="/ico/delete.png" alt="menu"></img>
                                </button>  
                            </div>
                        }
                        </div>
                        {description !== "" &&
                            <p className="mt-2" id="pdescription"><a href={"/users/" + username} className="a-white">{username} </a> {description}</p>
                        }
                        <div className="input-group m-2">
                            <input className="form-control" rows="1" aria-label="With textarea" placeholder="Enter a comment..."></input>
                            <div className="input-group-prepend ml-2">
                                <button className="btn-invisible">Comment</button>
                            </div>
                        </div>
                 </div>
            </div>
        </>
    );

}