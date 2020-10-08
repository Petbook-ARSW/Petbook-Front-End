import React from 'react';

export default function Event({name, date, hour, information}) {

    return (
        <div className="col-lg-4 mt-3">
            <div className="card">
                <div className="card-header text-center">
                   <h5>{name}</h5>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                      <h6 className="card-title col-5">{date}</h6>
                      <h6 className="card-title">{hour}</h6>
                    </div>
                    <p className="card-text information">{information}</p>
                    <button className="btn-petbook btn-block mt-4" href="/eventDetail">View</button>
                </div>
            </div>
        </div>
    );

}