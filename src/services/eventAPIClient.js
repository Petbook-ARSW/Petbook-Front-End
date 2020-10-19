
export const postEvent = ( event ) => {
    return  fetch('https://petbook-api.herokuapp.com/events/newEvent', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const getAllEvents = ( ) => {
    return  fetch(`https://petbook-api.herokuapp.com/events`)
                .then( res => {
                    if (!res.ok) throw new Error('Response is NOT ok');
                    return res.json();
                })
}

export const getEventById = ( id ) => {
    return  fetch(`https://petbook-api.herokuapp.com/events/${ id }`)
                .then( res => {
                    if (!res.ok) throw new Error('Response is NOT ok');
                    return res.json();
                })
}


export const getGoalsOfEvent = ( idEvent ) => {
    return  fetch(`https://petbook-api.herokuapp.com/events/${ idEvent }/goals`)
                .then( res => {
                    if (!res.ok) throw new Error('Response is NOT ok');
                    return res.json();
                })
}

export const postGoal = ( goal , eventId) => {
    return  fetch(`https://petbook-api.herokuapp.com/events/${ eventId }/newGoal`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(goal)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const updateEvent = ( event ) => {
    return  fetch('https://petbook-api.herokuapp.com/updateEvent/events/', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const cancelEventById = ( idEvent ) => {
    return  fetch(`https://petbook-api.herokuapp.com/deleteEvent/events/${ idEvent }`, {
                method: 'DELETE',
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const updateGoal = ( goal ) => {
    return  fetch('https://petbook-api.herokuapp.com/updateGoal/events/goals', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(goal)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const removeGoal = ( idGoal ) => {
    return  fetch(`https://petbook-api.herokuapp.com/deleteGoal/events/goals/${ idGoal }`, {
                method: 'DELETE',
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const getParticipantsOfEvent = ( idevent ) => {
    return  fetch(`https://petbook-api.herokuapp.com/events/${ idevent }/participants`)
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}
