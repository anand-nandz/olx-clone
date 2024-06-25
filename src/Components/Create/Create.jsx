import React, { useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FirebaseContext from "../../Storage/firebaseContext";
import { userContext } from "../../Storage/userContext";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const Create = () => {
   const [name,setName] =useState('')
   const [category,setCategory] = useState('')
   const [price,setPrice] = useState('')
   const [image,setImage] =useState(null) 
  const {firebase} =useContext(FirebaseContext)
  const {user} = useContext(userContext)
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

   

   const handleProductUpload = async ()=>{
    if(name.length==0 && category.length==0 && price<=0 && !image ){

    }else{
      
      const storage = getStorage(firebase)
      const reference_storage = ref(storage,`/image/${image.name}`)
      const snapshot = await uploadBytes(reference_storage, image);
      const downloadURL = await getDownloadURL(snapshot.ref)
      const fireDb = getFirestore(firebase)
      const collectionRef = collection(fireDb,'products')
      const date = new Date().toLocaleDateString();
      const productDetails = {
        userID :user.uid,
        name :name,
        category : category,
        price : price,
        imageURL : downloadURL,
        createAt : date.toString()
      }
      await addDoc(collectionRef,productDetails);
      showToastMessage("Product Added Successfully",'success')
      setTimeout(()=> navigate('/'),2500)

    }

   }
  
    return (
      <>
        <Header />
        <ToastContainer/>
        <div className="parentContainer">
          <div className="centerDiv">
            <label className="label" htmlFor="name" >Name</label>
            <br />
            <input className="input" type="text" id="name" name="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <br />
            <label className="label" htmlFor="category">Category</label>
            <br />
            <input className="input" type="text" id="category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <br />
            <label className="label" htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <br /><br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""} />
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn"  onClick={handleProductUpload}>Upload and Submit</button>
          </div>
        </div>
      </>
    );
  };
  
  export default Create;