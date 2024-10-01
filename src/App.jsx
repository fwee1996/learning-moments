// import { Route, Routes } from "react-router-dom"
// import { AllPosts } from "./components/allposts/AllPosts"

// export const App =()=>{
//   return (
//   <Routes>
// <Route path="/register" element={<AllPosts/>}/>
// {/* <Route path="/login" element={<Login/>}/>
// <Route path="/register" element={<Register/>}/>

//     <Route path="*" element={
//       //Authorized checks if user is authorized(honey_user obj found) if so then application view is the child component of authorized then routes in appView will be shown
//       <Authorized>
//         <ApplicationViews />
//       </Authorized>
//     }
//     /> */}
//   </Routes>
  
//   )
// }



import { Route, Routes } from "react-router-dom";
//import { AllPosts } from "./components/post/AllPosts";----------gone to ApplicationViews
import { Register } from "./components/auth/Register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./components/auth/Login";

//Pt3-ch10: Authentication and Routes: Can login/register, * all path routes, AppView goes to all posts to display them.

export const App = () => {
    return (
            <Routes>
                {/* <Route path="/" element={<AllPosts />} /> ----------gone to ApplicationViews*/}
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={
                  //Authorized checks if user is authorized/logged in(honey_user obj found) if so then ApplicationViews will render
                  <Authorized>
                    <ApplicationViews />
                  </Authorized>
                }
                />
            </Routes>
    );
};

