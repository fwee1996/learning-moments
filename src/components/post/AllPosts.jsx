// All Posts view:

import React, { useState, useEffect } from "react"; // Added React import
import { getAllPosts } from "../../services/postServices";
import "./AllPosts.css";
import { Link } from "react-router-dom";

// Given the user wishes to view a list of all the posts
// When the user is at the home route or visits the All Posts view
// Then the title, topic and number of likes will display for each post in the database.
//your AllPosts component in the App component, the same way we have done with CustomerList and EmployeeList in Honey Rae Repairs.

export const AllPosts = () => {
    // State variables to hold posts, selected topic, and search term
    const [posts, setPosts] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(0);// Holds the selected topic ID
    const [searchTerm, setSearchTerm] = useState("");// Holds the search term

    // Function to fetch posts from the API when the component mounts
    // useEffect hook is utilized here to fetch all posts once when the component mounts.
    // It retrieves an array of posts using the getAllPosts() function and sets the state 'posts' with this array.
    // The empty dependency array [] ensures that this effect runs only once, simulating componentDidMount behavior.
    useEffect(() => {
        //get fn fetches data from api and returns a promise, 
        getAllPosts().then(postArray => {
            // Once the promise returned by getAllPosts is resolved(data fetched successfully), 
            // it updates the state variable 'posts' with the fetched post data "postArray" by calling setPosts.
            setPosts(postArray);
        });
    }, []);//[] is empty, this effect runs only once after the component mounts, ensuring that the posts are fetched and set to state only once when the component initially renders.

     // Function to handle changes in the topic dropdown
    const handleTopicChange = (event) => {
        setSelectedTopic(parseInt(event.target.value));// Update selected topic when dropdown value changes--console.log(event.target.value) is topic id
        //         //need parse int bcs dropdown topic <select> value attribute expects string   
    };

    // Function to handle changes in the search input field
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);// Function to handle changes in the search input field
    };

    return (
        <div className="posts">
            {/* Dropdown to filter posts by topic: */}
            <select id="topic" onChange={handleTopicChange} value={selectedTopic}>
                <option value={0}>Select a topic</option>

                {/* Dynamically generate options for topics */}
                {posts.map(post => (
                    <option key={post.topic.id} value={post.topic.id}>{post.topic.name}</option>
                ))}
            </select>

            {/* Input field to search posts by title: */}
            <input type="text" placeholder="Search by title" onChange={handleSearchChange} value={searchTerm} />
            
            {/* Display posts: */}
            {posts
            // Filter posts based on selected topic and search term
                .filter(post => selectedTopic === 0 || post.topic.id === selectedTopic)// Filter by selected topic
                .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))// Filter by search term
                .map(post => (
                    <div key={post.id}>
                        {/* Display topic, title, and number of likes for each post */}
                        {/* Link each post title to its details page */}
                        <div>
                            <Link to={`/post/${post.id}`}>{post.title}</Link> {/* Changes here */}
                        </div>
                        {/* Remove redundant mapping */}
                        <div>Topic: {post.topic.name}</div> {/* Changes here */}
                        <div>Number of likes: {post.likes}</div>
                    </div>
                ))}
        </div>
    );
};
