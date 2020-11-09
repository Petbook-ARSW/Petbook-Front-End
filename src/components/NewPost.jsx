import React, {useState} from 'react';
import ImageUploader from 'react-images-upload';
import {addPost} from '../services/postAPIClient';
import swal from 'sweetalert';

export default function NewPost() {


  const [picture, setPicture] = useState([]);

  const onDrop = imgs => {
    setPicture([imgs[0]]);
  };


  const savePost = ()=> {
    addPost(picture[0], document.getElementById("descpost").value, localStorage.getItem("userId"))
      .then(() => {
        swal({title: "Add post", icon:"success", text: "Post registered", timer:"5000"})
            .then( () => window.location.reload());
      }).catch(() => {
          swal({title: "Add post", icon:"error", text: "Fail", timer:"5000"})
      });
  }

  return (
    <div className="container border-container p-3">
      <form>
        <ImageUploader
          withLabel={false}
          withIcon={false}
          buttonText='Upload image'
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
          onChange={onDrop}
          fileContainerStyle ={
            {background: "transparent",
            padding: "0px",
            boxShadow: "none"}
          }
          buttonStyles={
            {background : "-webkit-linear-gradient(left, rgba(4,35,66,1) 0%, rgba(130,37,170,1) 96%, rgba(130,37,170,1) 100%)", 
            border: "none",
            borderRadius : "0.3rem",
            margin: "0px"
           }
          }
        ></ImageUploader>
        <textarea className="form-control" placeholder="Type a description..." id="descpost"></textarea>
        <div className="row justify-content-end pr-3 align-items-end">
          <button className="btn-petbook mt-2" type="button" onClick={savePost}>Post</button>
        </div>
      </form>
    </div>
  );

}