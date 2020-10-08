import React from 'react';

export default function NewPost() {
  return (
    <div className="adminx-content" id="new">
      <div className="adminx-main-content">
        <div className="container-fluid">
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb adminx-page-breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/">Posts</a></li>
              <li className="breadcrumb-item active" aria-current="page">New post</li>
            </ol>
          </nav>
          <div className="pb-3">
            <h1>New Post</h1>
          </div>
          <div className="row">
          </div>
        </div>
      </div>
    </div>
  );
}