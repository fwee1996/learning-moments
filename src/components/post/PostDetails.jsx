// Given the user wishes to view a post
// When the user clicks on the title of a post (in the All Posts view)
// Then the application will navigate to the Post Details view for the post

// Given the user wishes to read a post
// When the user has clicked to view a specific post
// Then the title, author, topic, date, body, and number of likes should display for the post.

// Given the user is not the author of the post
// Then a button to like the post should display
// When the user clicks the like button
// Then the like relationship will save to the database and the application will navigate to the Favorites view

// Given the user is the author of the post
// Then a button to edit the post should display
// When the user clicks the edit button
// Then the application will navigate to the Edit Post view for the post

// No need to add the navigate functionality to the Favorites View or the Edit view since you have not implemented those views yet.

//If you wish to get a resource by it's primary key (id) in json server, rather than adding a query to the url (ex. ?id=) you can get the single resource by its id by adding the id to the end of the url:

//fetch(`http://localhost:8088/resources/${id}`)
// import { useEffect, useState } from "react"
// import { getPostByUserId } from "../../services/postServices"
// import { useParams } from "react-router-dom"
// import "./AllPosts"

// export const PostDetails= ({postId})=>{
//     const [post, setPost]=useState({})

//     //The useParams hook gives us a way to retrieve that information within the component that corresponds to that URL. 
//    // Set up a route param to capture the userId of the employee.
//     const {userId}=useParams()

//     // const [employeeTickets, setEmployeeTickets] = useState([]);

//     useEffect(()=>{
//         getPostByUserId(userId).then((data)=>{
//             const postObj=data[0]
//             console.log(postObj)
//             setPost(postObj)
//         })
//     },[userId])


// //title, author, topic, date, body, and number of likes  
//     return (<>
//     <div>Post Details for Post ID: {postId}</div>
//     <header >title: {post.title}</header>

//     <div>
//     <span >author: </span>
//     {post.user.fullName}
//     </div>

//     <div>
//     <span >topic : </span>
//     {post?.topic}
//     </div>

//     <div>
//     <span >date : </span>
//     {post?.date}
//     </div>

//     <div>
//     <span >body: </span>
//     {post?.body}
//     </div>

//     <div>
//     <span >number of likes: </span>
//     {post?.likes}
//     </div>
// </>)
// }



import React, { useEffect, useState } from "react";
import { getPostByUserId } from "../../services/postServices"; // Updated import
import { useParams } from "react-router-dom";
import "./AllPosts";

export const PostDetails = () => { // Removed postId from props
    const [post, setPost] = useState({});
    const { postId } = useParams(); // Changed from userId to postId

    useEffect(() => {
        getPostByUserId(parseInt(postId)).then((data) => { // Updated to fetch post by postId
            const postObj = data[0];
            console.log(postObj);
            setPost(postObj);
        });
    }, [postId]);

    return (
        <>
            <div>Post Details for Post ID: {postId}</div>
            <header >title: {post.title}</header>
            <div>
                <span >author: </span>
                {post.userId} {/* Changed from post.user.fullName */}
            </div>
            <div>
                <span >topic : </span>
                {post.topicId} {/* Changed from post?.topic */}
            </div>
            <div>
                <span >date : </span>
                {post.date}
            </div>
            <div>
                <span >body: </span>
                {post.body}
            </div>
            <div>
                <span >number of likes: </span>
                {post.likes}
            </div>
        </>
    );
};
