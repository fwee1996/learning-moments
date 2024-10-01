import { Link, useNavigate } from "react-router-dom"

//Add a link for "All Posts". Where should it navigate to? Add another link to logout. Copy and past the code below for this.
export const NavBar =()=>{

    const navigate= useNavigate() //Dont forget to Import useNav and define navigate function!

    return(
        (
            <>
                {localStorage.getItem("learning_user") ? (
                    <>
                            {/*just buttons and links to pages no content though*/}
                            {/* link to all posts: */}
                                <li>
                                    <Link to="/allPosts">All Posts</Link> {/* Add a link for "All Posts". It should navigate to the "/allposts" route. */}
                                </li>

                            {/* link to logout: */}
                                <li>
                                    <Link
                                        to=""
                                        onClick={() => {
                                            localStorage.removeItem("learning_user");
                                            navigate("/login", { replace: true }); // The logout Link will remove the learning_user from local storage and then navigate back to the login route.
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </li>

                            {/* link to new Post: */}
                                <li><Link to="/newPost">New Post</Link></li>

                    </>

                ) : ("")}
            </>
        )
    )}
    

//Render The Navbar in the parent home route in ApplicationViews so that it renders with all other child routes. Don't forget the Outlet component!