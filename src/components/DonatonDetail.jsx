import React, { useState, useEffect } from 'react';
import { postDonation, getDonationsByEvent, getMaxGoal } from '../services/donationClient';
import User from './User';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getGoalsOfEvent, getValueDonations } from '../services/eventAPIClient';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });

export default function EventDetail({ idEvent, idHost }) {

    const [donations, setDonations] = useState([]);
    const classes = useStyles();
    const [progress, setProgress] = useState(0);
    const [goals, setGoals] = useState([]);

    useEffect(function () {
        
        getGoalsOfEvent(idEvent)
            .then(response => {
                setGoals(response);
                getMaxGoal(idEvent)
                    .then (limit =>{
                        const timer = setInterval(() => {
                            getValueDonations(idEvent)
                                .then(res =>{
                                    document.getElementById("currValue").innerHTML  = `$ ${res} / $ ${limit}`;
                                    if ((100/limit)*res <= 100){
                                        setProgress((100/limit)*res);
                                    }
                                })
                                .catch(() =>{
                                    document.getElementById("currValue").innerHTML  = `$ 0 / $ ${limit}`;
                                    setProgress(0);
                                })
                          }, 500);

                        return () => {
                            clearInterval(timer);
                        };
                    })
                    .catch(() =>{});
                
            })
            .catch(() => setGoals([]));
    }, [idEvent]);

    const newDonation = () => {

        let currentDate = new Date();
        let day = currentDate.getDate();
        if (day < 10) {
            day = '0' + day;
        };
        let donation = {
            iduser: localStorage.getItem("userId"),
            idrefuge: idHost,
            idevent: idEvent,
            donationdate: currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + day,
            donationhour: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(),
            valor: document.getElementById("donationValue").value
        };

        postDonation(donation)
            .then(() => window.location.reload());

    };

    const getDonations = () => {
        getDonationsByEvent(idEvent)
            .then(res => {
                setDonations(res);
            })
            .catch(() => console.log("fail"));
    };

    return (
        <>
            <div className="card mb-grid" style={{ width: "55%" }}>
                <div className="card-header text-center">
                    <h5> Donaton detail</h5>
                </div>
                <div className="card-body">
                    <button className="btn-petbook" data-toggle="modal" data-target="#newDonation">Donate</button>
                    <button className="btn-petbook ml-2" data-toggle="modal" data-target="#viewDonations" onClick={getDonations}>View donations</button>
                    {goals.length > 0 &&               
                        <div className="mt-4 pt-4">
                            <div className={classes.root}>
                                <LinearProgress variant="determinate" value={progress} />
                            </div>
                            <h6 id="currValue">$</h6>
                        </div>
                    }  
                </div>
            </div>
            <div className="modal fade" id="newDonation" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">New Donation</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="p-4">
                                <input type="text" className="form-control" placeholder="Value" id="donationValue"></input>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-petbook" onClick={newDonation}>Donate</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="viewDonations" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Donations</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{
                            donations.map(d =>
                                <div className="row pl-4 align-items-end">
                                    <h5 className="mr-3">$ {d.valor}</h5>
                                    <User iduser={d.iduser}></User>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}