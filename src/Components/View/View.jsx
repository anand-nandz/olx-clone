import React, {useContext, useEffect, useState} from 'react';
import './View.css'
import { ViewContext } from '../../Storage/viewContext';
import FirebaseContext from '../../Storage/firebaseContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

function View() {
  const [userData,setUserData] = useState('')
  const {viewProduct} =useContext(ViewContext)
  const {firebase} = useContext(FirebaseContext)


  useEffect(()=>{
    const fetchData=async()=>{
      const {userID}  = viewProduct;
      const database =getFirestore(firebase)
      const usersCollection = collection(database,"users")
      const userQuery = query(usersCollection, where("uid", '==' , userID))

      try {
        const snapshot = await getDocs(userQuery)
        snapshot.forEach((doc)=>{
          setUserData(doc.data())
        })
        console.log(snapshot);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData()
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={viewProduct ?`${ viewProduct.imageURL}` : ""} alt="image"/>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{viewProduct.price}.00</p>
          <span>{viewProduct.name}</span>
          <p>{viewProduct.category}</p>
          <span>{viewProduct.createAt}</span>
        </div>
       {userData && <div className="contactDetails">
          <p>Seller details</p>
          <p>Name :   {userData.name} </p>
          <p>Contact : {userData.phone}</p>
          <p>Email :  {userData.email} </p>
        </div>}
      </div>
    </div>
  );
}

export default View;