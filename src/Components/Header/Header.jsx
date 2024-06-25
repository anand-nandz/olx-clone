import React, { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/olxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { userContext } from "../../Storage/userContext";
import FirebaseContext from "../../Storage/firebaseContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const {user,setUser} =useContext(userContext)
  const {firebase} = useContext (FirebaseContext)
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

  const sellHandle =()=>{
    if(user){
      navigate('/create')
    }else{
      showToastMessage("Login To your account",'error')
    }
  }

  const logOut=(event)=>{
    event.preventDefault()
    const auth = getAuth(firebase)
    auth.signOut().then(()=>{
        setUser(null)
        navigate('/login')
    })
    showToastMessage("Logged ou successfully",'success')
  }

  return (
    <>
    <ToastContainer/>
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName" >
            <OlxLogo />
          </div>
          <div className="placeSearch">
            <Search />
            <input type="text" defaultValue={"India"} />
            <Arrow />
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Find car,mobile phone and more..."
              />
            </div>
            <div className="searchAction">
              <Search color="#ffffff" />
            </div>
          </div>
          <div className="language">
            <span> ENGLISH </span>
            <Arrow />
          </div>
          <div className="loginPage">
          {user ? (
            <span onClick={logOut}>Logout</span>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <hr />
        </div>
          <div className="sellMenu" onClick={sellHandle}>
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span >SELL</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
