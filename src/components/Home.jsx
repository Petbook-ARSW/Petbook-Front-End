import React, {useEffect, useState} from 'react';
import NavBar from './NavBar';
import Post from './Post';
import NewPost from './NewPost';
import Axios from 'axios';

export default function Home() {

var [posts, setPosts] = useState([])

  useEffect(function(){
    Axios.get("https://petbook-api.herokuapp.com/posts")
      .then(res => {
        return res.data;
      })
      .then(Response => setPosts(Response))
      .catch(() => setPosts([]));
  }, [])

  return (
    <div className="adminx-container">
      <NavBar type='company' />
      <div className="row adminx-content" >
        <div className="ml-5 col-6">{
          posts.map(singlePost => 
          <Post
            id = {singlePost.id}
            iduser = {singlePost.iduser}
            img = {singlePost.picture}
            description = {singlePost.description}
            date = {singlePost.date}
          >
          </Post>)
        }</div>
        <div style={{ float: 'right', margin: "10px"}}>
          <div className="adminx-content col-5 position-fixed p-2">
            <div className="cointainer align-items-center justify-content-center border-b pb-3 mb-5">
              <a href={"/users/"+localStorage.getItem('userName')} className="a-white"><strong><h1>{localStorage.getItem('userName')}</h1></strong></a> 
              <h5>{localStorage.getItem('typeUserLogged')}</h5>
            </div>
            <NewPost />
          </div>
        </div>
      </div>
    </div>
  );
}
