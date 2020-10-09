import React from 'react';

export default function Event({id,name, date, hour, information}) {

    return (
        <div className="col-lg-4 mt-3 back ">
            <div className="card shadow">
                <div className="card-header text-center header-gradient">
                   <h4><strong>{name}</strong></h4>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                      <h6 className="card-title col-5">{date}</h6>
                      <h6 className="card-title">{hour}</h6>
                    </div>
                    <p className="card-text information">{information}</p>
                    <a href={"/events/"+id} className="a-invisible">
                        <button className="btn-petbook btn-block mt-4">View</button>
                    </a>
                </div>
            </div>
        </div>
    );

}