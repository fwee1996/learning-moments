export const getAllPosts=()=>{
    return fetch(`http://localhost:8088/allPosts?_expand=topic`).then ((res)=>res.json())}


   
    export const getPostByUserId=(userId)=>{
        return fetch(`http://localhost:8088/allPosts?_expand=user&userId=${userId}`).then ((res)=>res.json())}

//create post fn
export const createPost=(newPost)=>{//newPost instead  of postId?
    return fetch (`http://localhost:8088/allPosts`, {
        method: "POST",
        headers: {
            "Content-Type":" application/json",
        },
        body: JSON.stringify(newPost),
        })
}