import React, { useContext, useState } from "react";
import Logo from '../../assets/Images/olx-logo.png'
import FirebaseContext from "../../Storage/firebaseContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const firebaseApp = useContext(FirebaseContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate()


  const showToastMessage = (message,type) => {
    const options ={
        position: "top-right",
        autoClose: 3000,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authentication = getAuth(firebaseApp);
    try {
      const userCredential = await createUserWithEmailAndPassword(authentication,email,password);
      const user = userCredential.user;
      const database = getFirestore(firebaseApp);
      const userObj = {
        uid: user.uid,
        name: name,
        phone: phone,
        email: email,
      };
      await setDoc(doc(database, "users", user.uid), userObj);
      showToastMessage("User registered successfully",'success')
      setTimeout(()=>{
        navigate('/login')
      },1000)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <ToastContainer/>
     <div className="signupParentDiv">
      <img width="150px" height="150px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input className="input" type="text" id="username" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input className="input" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="phone">Phone</label>
        <input className="input" type="number" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input className="input" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
      <div className="alreadyAccount">
        <p><Link to={'/login'}>Already have an account? Login</Link></p>
      </div>
    </div>
    </>
  )
}

export default Signup