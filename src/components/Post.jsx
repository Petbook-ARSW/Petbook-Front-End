import React from 'react';

export default function Event({ user, url, description }) {

    return (
        <div className="card m-3" >
            <div className="card-header">
                <h6><strong>{user}</strong></h6>
            </div>
            <img width="100%" src={url} alt="img post"></img>
            <div className="card-footer">
                <p className="card-text information">{description}</p>
            </div>
        </div>
    );

}