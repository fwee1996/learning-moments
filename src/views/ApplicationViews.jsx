import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/post/AllPosts";
import { NavBar } from "../components/nav/NavBar";
import { useEffect, useState } from "react";
import { NewPost } from "../components/newPost/NewPost";
import { PostDetails } from "../components/post/PostDetails";


export const ApplicationViews = () => {

     //add state to hold our current user
     //In ApplicationViews create a new state variable for currentUser. 
    const [currentUser, setCurrentUser] = useState({});

    //On the initial render of the application, get the user from local storage and set your currentUser.
    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user");
        const learningUserObject = JSON.parse(localLearningUser);//DON'T forget this step!
        setCurrentUser(learningUserObject);
    }, []);

    return (
        <>
            <NavBar /> {/* Render NavBar outside the Routes */}
            <Routes>
                {/* Define parent Route for home path */}
         {/* The NavBar component is rendered as a direct child of the Route component for the home route ("/"), ensuring it renders with all other child routes. */}
                <Route path="/" element={<AllPosts />} /> {/* Use element prop to render components */}
                 {/* nested child route is defined to render the AllPosts component when the home route is accessed ("/"). */}
              {/* element = {} */}
                <Route path="/allPosts" element={<AllPosts />} /> {/* Use element prop to render components */}
                <Route path="/newPost" element={<NewPost currentUser={currentUser} />} /> {/* Pass currentUser as prop */}
                {/* Add other routes here */}
                <Route path="/post/:postId" element={<PostDetails/>}/> 
            </Routes>
            <Outlet /> {/* Render Outlet to allow rendering of child routes */}
        </>
    );
};

export default ApplicationViews;

 //Render The Navbar in the parent home route in ApplicationViews so that it renders with all other child routes. Don't forget the Outlet component!