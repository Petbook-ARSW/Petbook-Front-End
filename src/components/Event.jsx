import React from 'react';

export default function Event() {
    return (
        <div className="col-lg-4">
            <div className="card">
                <div className="card-header text-center">
                   <h5> Jornada de vacunación</h5>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                      <h6 className="card-title col-5">Date: 2020-10-18 </h6>
                      <h6 className="card-title"> Hour: 10:00</h6>
                    </div>
                    <p className="card-text">Información del evento...</p>
                    <button className="btn-petbook btn-block mt-4" to="/HomePerson">View</button>
                </div>
            </div>
        </div>
    );

}