import React, { useContext, useState } from "react";
import FirebaseContext from "../../Storage/firebaseContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/Images/olx-logo.png'
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword] = useState('')
  const firebaseApp = useContext(FirebaseContext)
  const navigate = useNavigate()
  
    const showToastMessage = (message,type) => {
        const options ={
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: "dark",
        }

        if(type === 'error'){
            toast.error(message,options)
        }else if(type === 'success'){
            toast.success(message,options)
        }
        
    };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const auth = getAuth(firebaseApp)
    try {
        await signInWithEmailAndPassword(auth,email,password)
        navigate('/')
        showToastMessage("Log In successful",'success')

    } catch (error) {
        showToastMessage("Enter valid Email and Password",'error')
    }
  }
  return (
    <>
    <ToastContainer/>
      <div className="loginParentDiv">
        <img width="150px" height="150px" src={Logo} alt="OLX Logo" />
        <form onSubmit={(e)=>{handleSubmit(e)}} >
          <label htmlFor="fname">Email</label>
          <input className="input" type="email" id="fname" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <label htmlFor="lname">Password</label>
          <input className="input" type="password" id="lname" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
        <div className="dontHaveAccount">
          <p><Link to={'/signup'}>You don't have an account. Sign up</Link></p>
        </div>
         <a>Signup</a>
      </div>
    </>
  );
}

export default Login;