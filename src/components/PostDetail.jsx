import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Axios from 'axios';
import { getPostById } from '../services/postAPIClient';
import swal from 'sweetalert';
import { removePost, updatePost, getLikesOfPost, getCommentsOfPost, addComment, postLike, disLike } from '../services/postAPIClient';
import User from './User';

export default function PostDetail() {

  const { id } = useParams()
  const [post, setPost] = useState({})
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(function () {
    getPostById(id)
      .then(Response => {
        setPost(Response);
        Axios.get(`https://petbook-api.herokuapp.com/users/id/${Response.iduser}`)
          .then(res => {
            return res.data;
          })
          .then(({ userName }) => {
            setUsername(userName);
          })
          .catch(() => setUsername(""));
      })
      .catch(() => setPost({}))

    getLikesOfPost(id)
      .then(Res => setLikes(Res))
      .catch(() => setLikes([]));

    getCommentsOfPost(id)
      .then(Res => setComments(Res))
      .catch(() => setComments([]));

  }, [id, username])

  const showEdit = () => {
    document.getElementById("divEdit").style.display = "inline";
  }

  const cancelEdit = () => {
    document.getElementById("divEdit").style.display = "none";
  }

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
                .then(() => window.location.href = `/users/${username}`);
            })
            .catch(() => {
              swal({ title: "Delete post", icon: "error", text: "Fail", timer: "5000" })
            })
        }
      });
  };

  const editPost = () => {
    post.description = document.getElementById("newDesc").value;
    updatePost(post.id, post)
      .then(() => {
        swal({ title: "Update post", icon: "success", text: "Post updated", timer: "5000" })
          .then(() => window.location.reload());
      })
      .catch(() => {
        swal({ title: "Update post", icon: "error", text: "Fail", timer: "5000" })
      })
  }

  const postComment = () => {
    let newComment = {
      iduser: localStorage.getItem("userId"),
      idpost: id,
      mesage: document.getElementById("newComment").value
    }
    addComment(newComment)
      .then(() => window.location.reload())
      .catch();
  }

  const getUserComment = (iduser) => {
    return "user name";
  }

  const addlike = () => {
    postLike(id, localStorage.getItem("userId"))
      .then(() => window.location.reload())
      .catch(() => console.log("err"));
  }

  const removeLike = () => {
    disLike(id, localStorage.getItem("userId"))
      .then(() => window.location.reload())
      .catch(() => console.log("err"));
  }

  return (
    <> 
    <div className="adminx-container">
      <NavBar />
      <div className="adminx-content">
        <div className=" row mt-4 justify-content-center">
          <div className="col-5">
            <img width="100%" src={`data:image/jpeg;base64,${post.picture}`} alt="img post"></img>
          </div>
          <div className="col-5">
            <div className="card" style={{ maxHeight: "80vh" }}>
              <div className="card-header">
                <div className="row mt-2">
                  <div className="col-6 p-0">{
                    likes.filter(({ iduser }) => iduser.toString() === localStorage.getItem('userId')).length > 0 ?
                      <button className="btn-invisible ml-2" id="btndislike">
                        <img className=" background-gradient menu-icon mr-1" src="/ico/like.png" width="100%" alt="menu" onClick={removeLike}></img>
                      </button>
                      :
                      <button className="btn-invisible ml-2" type="button" id="btnlike" onClick={addlike}>
                        <img className="menu-icon mr-1" src="/ico/like.png" alt="menu"></img>
                      </button>
                    }
                    <button className="btn-invisible" type="button" data-toggle="modal" data-target="#likesDetail">{likes.length}</button> 
                    <button className="btn-invisible ml-3" id="btnEdit" type="button">
                      <img className="menu-icon mr-1" src="/ico/comment.png" alt="menu"></img>{comments.length}
                    </button>
                  </div>{username === localStorage.getItem("userName") &&
                    <div className="row col-6 justify-content-end m-0">
                      <button className="btn-invisible mr-2" id="btnEdit" type="button" onClick={showEdit}>
                        <img className="menu-icon" src="/ico/edit.png" alt="menu"></img>
                      </button>
                      <button className="btn-invisible" id="btnDelete" type="button" onClick={deletePost}>
                        <img className="menu-icon" src="/ico/delete.png" alt="menu"></img>
                      </button>
                    </div>
                  }
                </div>
                {post.description !== "" &&
                  <p className="mt-2" id="pdescription"><a href={"/users/" + username} className="a-white">{username} </a> {post.description}</p>
                }
                <div style={{ display: "none" }} id="divEdit">
                  <input className="form-control" placeholder="Type a new description..." id="newDesc"></input>
                  <div className="row justify-content-end mr-2">
                    <button className="btn-petbook m-2" onClick={cancelEdit}>Cancel</button>
                    <button className="btn-petbook m-2" onClick={editPost}>Save</button>
                  </div>
                </div>
              </div>
              <div className="card-body row justify-content-center" style={{ overflowY: "scroll" }}>{
                comments.map(comment =>
                  <div className="col-10 m-2 align-items-end" style={{ borderBottom: "1px solid #C0C0C0" }}>
                    <p><a href={"/users/" + getUserComment(comment.iduser)} className="a-white">{getUserComment(comment.iduser)} </a> {comment.mesage}</p>
                  </div>
                )
              }</div>
              <div className="card-footer">
                <div className="input-group m-2">
                  <input className="form-control" rows="1" aria-label="With textarea" placeholder="Enter a comment..." id="newComment"></input>
                  <div className="input-group-prepend ml-2">
                    <button className="btn-invisible" onClick={postComment}>Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="likesDetail" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                  <h4 className="modal-title">Likes</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="p-4">{
                  likes.map(like =>
                      <User iduser={like.iduser}></User>
                  )
              }</div>
          </div>
      </div>
    </div>
    </>
  );
}