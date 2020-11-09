export const addPost = ( file, description, idUser ) => {
    console.log(file);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("idUser", idUser);
    formData.append("description", description);
    return  fetch(`https://petbook-api.herokuapp.com/posts`, {
                 method: 'POST',
                 body: formData
             }).then( res => {
                 if (!res.ok) throw new Error('Response is NOT ok');
             });
}

export const updatePost = ( idpost, postUpdated ) => {
    return  fetch(`https://petbook-api.herokuapp.com/posts/${ idpost }`, {
                method: 'PUT',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(postUpdated)
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const removePost = ( idpost ) => {
    return  fetch(`https://petbook-api.herokuapp.com/posts/${ idpost }`, {
                method: 'DELETE',
            }).then( res => {
                if (!res.ok) throw new Error('Response is NOT ok');
            });
}

export const getAllPosts = ( ) => {
    return  fetch('https://petbook-api.herokuapp.com/posts')
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}

