import React from 'react';
import {Redirect, Route} from 'react-router-dom';

class GuardRoute extends React.Component {
    render(){

        const isLogged = localStorage.getItem('isLoggedIn');

        const {
            type,
        } = this.props;
        
        if (type === "private" && !isLogged){
            return <Redirect to="/"/>;

        }else if (type === "public"){
            console.log(localStorage.getItem("typeUserLogged"))
            console.log(isLogged)
            if (isLogged){
                if (localStorage.getItem("typeUserLogged") === "Person"){
                    return <Redirect to="/homePerson"/>;
                }else if (localStorage.getItem("typeUserLogged") === "Veterinary"){
                    return <Redirect to="/homeVeterinary"/>;
                }else if (localStorage.getItem("typeUserLogged") === "Refuge"){
                    return <Redirect to="/homeRefuge"/>;
                }
            }
        }
        return <Route {...this.props} />
    }
}

export default GuardRoute;
