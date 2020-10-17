import React from 'react';

export default function NewPost() {

  return (
    <div className="container border-container p-3">
      <form>
        <textarea className="form-control" placeholder="Type a post..."></textarea>
        <div className="row justify-content-end pr-3 align-items-end">
          <button className="btn-invisible mr-3"> <img className="menu-item mr-2" src="/ico/picture.png" alt="imagePost">
            </img>Photo
          </button>
          <button className="btn-petbook mt-2">Post</button>
        </div>
      </form>
    </div>
  );

}