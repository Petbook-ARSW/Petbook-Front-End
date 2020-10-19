import React, { useState, useEffect } from 'react';
import { getUserById } from '../services/userAPIClient';

export default function User( {iduser}) {

    const [username, setUsername] = useState("");

    useEffect(function () {
        getUserById(iduser)
            .then(Response => {
                setUsername(Response.userName);
            })
            .catch(() => setUsername(""));
    }, [iduser])  

    return (
        <div className="row p-2">
           <a className="a-white" href={"/users/"+username}>
               {username}
            </a> 
        </div>
    );
}
