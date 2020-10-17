export const postPet = ( pet ) => {
    return  fetch('https://petbook-api.herokuapp.com/pets/newPet', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(pet)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const getPetsByIdPerson = ( personId ) => {
    return  fetch(`https://petbook-api.herokuapp.com/pets/${ personId }`)
                .then( res => {
                    if (!res.ok) throw new Error('Response is NOT ok');
                    return res.json();
                })
}

export const updatePet = ( petId, pet ) => {
    return  fetch(`https://petbook-api.herokuapp.com/pets/changePet/${ petId }`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(pet)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const getPetById = ( petId ) => {
    return  fetch(`https://petbook-api.herokuapp.com/pets/pet/${ petId }`)
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}

export const removePet = ( petId ) => {
    return  fetch(`https://petbook-api.herokuapp.com/pets/${ petId }`, {
                method: 'DELETE',
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}