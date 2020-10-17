import React from 'react';

export default function Event({id, name, birthdate, information}) {

    return (
        <div className="col-lg-4 mt-3 back ">
            <div className="card shadow">
                <div className="card-header text-center">
                   <h4><strong>{name}</strong></h4>
                </div>
                <div className="card-body">
                    <h6 className="card-title col-5">Birthdate: {birthdate}</h6>
                    <p className="card-text information">{information}</p>
                    <a href={"/pets/"+id} className="a-invisible">
                        <button className="btn-petbook btn-block mt-4">View</button>
                    </a>
                </div>
            </div>
        </div>
    );

}