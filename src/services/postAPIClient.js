export const addPost = ( file, description, idUser ) => {
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

export const getPostById = ( idpost ) => {
    return  fetch(`https://petbook-api.herokuapp.com/posts/${ idpost }`)
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}

export const getLikesOfPost = ( idpost ) => {
    return  fetch(`https://petbook-api.herokuapp.com/posts/${ idpost }/likes`)
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}

export const getCommentsOfPost = ( idpost ) => {
    return  fetch(`https://petbook-api.herokuapp.com/post/comments/${ idpost }`)
    .then( res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    })
}

export const addComment = ( comment ) => {
    return  fetch(`https://petbook-api.herokuapp.com/users/addComment`, {
                 method: 'POST',
                 headers: {
                    "Content-Type": "application/json"
                },
                 body: JSON.stringify(comment)
             }).then( res => {
                 if (!res.ok) throw new Error('Response is NOT ok');
             });
}

export const postLike = ( idpost, iduser ) => {
    return  fetch(`https://petbook-api.herokuapp.com/users/LikeToPost/${idpost}/${iduser}`, {
                 method: 'POST'
             }).then( res => {
                 if (!res.ok) throw new Error('Response is NOT ok');
             });
}

export const disLike = ( idpost, iduser ) => {
    return  fetch(`https://petbook-api.herokuapp.com/users/DislikeToPost/${idpost}/${iduser}`, {
                 method: 'DELETE'
             }).then( res => {
                 if (!res.ok) throw new Error('Response is NOT ok');
             });
}