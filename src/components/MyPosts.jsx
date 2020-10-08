import React from 'react';

export default function MyPosts() {
  return (
    <div className="adminx-content" id="new">
      <div className="adminx-main-content">
        <div className="container-fluid">
          <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb adminx-page-breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/">Posts</a></li>
              <li className="breadcrumb-item active" aria-current="page">My posts</li>
            </ol>
          </nav>
          <div className="pb-3">
            <h1>My Posts</h1>
          </div>
          <div className="row">
          </div>
        </div>
      </div>
    </div>
  );
}