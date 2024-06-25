import React,{ useContext, useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userContext } from "./Storage/userContext";
import FirebaseContext from "./Storage/firebaseContext";
import { ViewContextProvider } from "./Storage/viewContext";
import "./App.css";
import { getAuth } from "firebase/auth";


function App() {
  const {setUser}=useContext(userContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    const auth = getAuth(firebase)
    auth.onAuthStateChanged((user)=>setUser(user))
  },[])

  return (
    <>
     <ViewContextProvider>
        <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/login" element ={<Login/>}/>

              <Route exact path="/create" element ={<Create/>}/>

              <Route exact path="/view-post" element ={<ViewPost/>}/>
              
            </Routes>
          </Router>
     </ViewContextProvider>
        
      
    </>
  );
}

export default App;