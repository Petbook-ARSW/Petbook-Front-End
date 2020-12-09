
export const postDonation = ( donation ) => {
    return  fetch('https://petbook-api.herokuapp.com/donations/newDonation', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(donation)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const getDonationsByEvent = ( idEvent) => {
    return  fetch(`https://petbook-api.herokuapp.com/event/donations/${idEvent}`)
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}

export const getMaxGoal = ( idEvent) => {
    return  fetch(`https://petbook-api.herokuapp.com/events/${idEvent}/goals/value`)
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}
