// // In this chapter you will add a link to New Post in the Nav Bar and implement the following user stories for the New Post view:

// // Given the user wishes to create a new post
// // When the user clicks on New Post in the Nav Bar
// // Then a form to create a new post will display

// // Given the user wishes to select a topic for the post
// // When the user clicks on the topic dropdown
// // Then a list of the topics should appear

// // Given the user has entered a title for the post
// // And the user has entered the body for the post
// // And the user has selected a topic for the post
// // When the user clicks the save button
// // Then the post will save to the database 

// //new post form:
// //topic dropdown
// //title,body, save button

// import { useState } from "react"
// import "./Forms.css"
// import { createPost, getAllPosts } from "../../services/postServices"
// import { useNavigate } from "react-router-dom"
// //cust create ticket:
// //create ticket button take you to new service ticket form
// //step 1: go to FilterBar -useNav()
// //step 2:TicketForm create fn: so you know in ticket form user will see description input and emergency tick button 
// export const newPost=({currentUser})=>{
// //capture user input in description: define state to hold ticket
// const [post,setPost]=useState({title:"", body:"",topicId: 0})
// //we want to add all properties we need to tix obj
// //capture input n store as properties in ticket obj--so add onchange in <input description below ---when value input changes, set description of tix to be that value
// const [topics, setTopics] = useState([]);

// const navigate=useNavigate()


// const [posts, setPosts] = useState([]);
//     const [selectedTopic, setSelectedTopic] = useState(0);

//     useEffect(() => {
//         getAllPosts().then(postArray => {
//             setPosts(postArray);
//         });
//     }, []);

//     const handleTopicChange = (event) => {
//         setSelectedTopic(parseInt(event.target.value));
//     };


// //first go to TicketService.jsx to create a fn that POST newly created tix:
// const handleSave=(event)=>{
// //prevent default behavior of button that refreshes:
// event.preventDefault()
//     <select id="topic" onChange={handleTopicChange} value={selectedTopic}>
//     <option value={0}>Select a topic</option>
//     {posts.map(post => (
//         <option key={post.topic.id} value={post.topic.id}>{post.topic.name}</option>
//     ))}
//     </select>
//     //each ticket needs useId and date completed--add these b4 send to database
//     //check if there description b4 send
//     if ( post.title){
// //need userId from currentUser-so go to CustViews.jsx and put create currentUser={currentUser} in <TicketForm !! Then put currentUser in export fn declaration above as well!
//         const newPost={
//             userId: currentUser.id,
//             description: post.title,
//             dateCompleted:"",
//         }
//         createPost(newPost)
//         //when user submits new tix they go back to posts view so declare navigate and useNav above handleSave fn
//         navigate("/allPosts")
//     }else{window.alert("Please fill out the title!")}


//     if ( post.body){
//         //need userId from currentUser-so go to CustViews.jsx and put create currentUser={currentUser} in <TicketForm !! Then put currentUser in export fn declaration above as well!
//                 const newPost={
//                     userId: currentUser.id,
//                     description: post.body,
//                     dateCompleted:"",
//                 }
//                 createPost(newPost)
//                 //when user submits new tix they go back to posts view so declare navigate and useNav above handleSave fn
//                 navigate("/allPosts")
//             }else{window.alert("Please fill out the body!")}
// }





// return (
// <form>
//     <h2>New Post</h2>
//         <fieldset>
//             <div>
//                 <label>Title</label>
//                 <input type="text"  onChange={(event)=>{
// //rmbr EmploEdit:must make copy of the state obj before setting it if we just want to change the state properties
//                     const postCopy={...post}
//                     postCopy.description=event.target.value//to get user input, captured on the event.event.target gets the user input. the event is obj rep what is happening, target is the element which the thing is happening, and value of <input.. >above
//                     setPost(postCopy)
//                }}/>
//             </div>
//         </fieldset>

//         <fieldset>
//             <div>
//                 <label>Body</label>
//                 <input type="text"  onChange={(event)=>{
// //rmbr EmploEdit:must make copy of the state obj before setting it if we just want to change the state properties
//                     const postCopy={...post}
//                     postCopy.description=event.target.value//to get user input, captured on the event.event.target gets the user input. the event is obj rep what is happening, target is the element which the thing is happening, and value of <input.. >above
//                     setPost(postCopy)
//                }}/>
//             </div>
//         </fieldset>

//    {/* buttons: */}
//    <fieldset><div className="form-group">
//     <div className="form-group"><button className="form-btn btn-info" onClick={handleSave}>Save</button></div>
//    </div></fieldset>
// {/* now go to CustViews.jsx to update route */}

// {/* chapter 16 so the issue is button has default refresh but we we it to do onClick instead so put (event) in handleSave fn line declaration*/}
// {/* the go up up and put event.preventDefault! */}
// </form>)
// }


import React, { useState, useEffect } from "react";
import { createPost, getAllPosts } from "../../services/postServices";
import { useNavigate } from "react-router-dom";

export const NewPost = ({ currentUser }) => {
    const [post, setPost] = useState({ title: "", body: "", topicId: 0 });
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch topics from the API
        getAllPosts().then(posts => {
            const uniqueTopics = Array.from(new Set(posts.map(post => post.topic.id)));
            setTopics(uniqueTopics);
        });
    }, []);

    const handleTopicChange = (event) => {
        setPost({ ...post, topicId: parseInt(event.target.value) });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const handleSave = (event) => {
        event.preventDefault();
        if (post.title && post.body && post.topicId) {
            // Create a new post object with user ID
            const newPost = {
                userId: currentUser.id,
                title: post.title,
                body: post.body,
                topicId: post.topicId,
                dateCompleted: new Date().toISOString(), // Assuming this is the date format expected by your backend
            };
            // Call the API to create the post
            createPost(newPost).then(() => {
                // Redirect to allPosts after successful creation
                navigate("/allPosts");
            }).catch(error => {
                console.error("Error creating post:", error);
                // Handle error (show message to the user, etc.)
            });
        } else {
            // Show error message if any field is missing
            window.alert("Please fill out all fields!");
        }
    };

    return (
        <form>
            <h2>New Post</h2>
            <fieldset>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={post.title} onChange={handleInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                    <label>Body</label>
                    <input type="text" name="body" value={post.body} onChange={handleInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                    <label>Topic</label>
                    <select name="topicId" onChange={handleTopicChange} value={post.topicId}>
                        <option value={0}>Select a topic</option>
                        {topics.map(topicId => (
                            <option key={topicId} value={topicId}>{topicId}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-info" onClick={handleSave}>Save</button>
                </div>
            </fieldset>
        </form>
    );
};

export default NewPost;


