import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Start(){
    return (
        <div className="index-container background-white">
            <div className="container register text-center col-4 border-container pl-5 pr-5 pt-3 pb-3">
                <img src="logoPetbook.png" width="40%" alt=""></img>
                <div className="container register mt-4">
                    <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#TabSignIn" role="tab" aria-controls="home" aria-selected="true">Sign in</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#TabSignUp" role="tab" aria-controls="profile" aria-selected="false">Sign up</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="TabSignIn" role="tabpanel" aria-labelledby="home-tab">
                            <SignIn></SignIn>
                        </div>
                        <div className="tab-pane fade" id="TabSignUp" role="tabpanel" aria-labelledby="profile-tab">
                            <SignUp></SignUp>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
