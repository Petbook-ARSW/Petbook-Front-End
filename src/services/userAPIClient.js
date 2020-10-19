
export const getUserByUserName = ( username ) => {
    return  fetch(`https://petbook-api.herokuapp.com/users/${username}`)
                .then( res => {
                    if (!res.ok) throw new Error('Response is NOT ok');
                    return res.json();
                })
}

export const getAllUsers = ( ) => {
    return  fetch('https://petbook-api.herokuapp.com/users')
                .then( res => {
                    if (!res.ok) throw new Error('Response is NOT ok');
                    return res.json();
                })
}

export const postUser = ( user ) => {
    return  fetch('https://petbook-api.herokuapp.com/users/newUser', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const updateUser = ( user ) => {
    return  fetch('https://petbook-api.herokuapp.com/users/changeUser/', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const postParticipation = ( idevent, iduser ) => {
    return  fetch(`https://petbook-api.herokuapp.com/users/participInEnvent/${ idevent }/${ iduser }`, {
                method: 'POST',
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const removeParticipation = ( idevent, iduser ) => {
    return  fetch(`https://petbook-api.herokuapp.com/users/participInEnvent/${ idevent }/${ iduser }`, {
                method: 'DELETE'
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const getUserById = ( iduser ) => {
    return  fetch(`https://petbook-api.herokuapp.com/users/id/${ iduser}`)
                .then( res => {
                    if (!res.ok) throw new Error('Response is NOT ok');
                    return res.json();
                })
}




