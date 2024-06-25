import React, { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Posts.css";
import FirebaseContext from "../../Storage/firebaseContext";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ViewContext } from "../../Storage/viewContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const {firebase} = useContext(FirebaseContext)
  const {setViewProduct} =useContext(ViewContext)
 
  const [products,setProducts]=useState([])
  const fireDb =getFirestore(firebase)
  const navigate= useNavigate()

  useEffect(()=>{
    const fetchPdts = async()=>{
      const productsCollection = collection(fireDb,'products')
      const snapshot =  await getDocs(productsCollection)
      const allProducts = snapshot.docs.map((elements)=>{
        return { ...elements.data(),id:elements.id}
      })
      setProducts(allProducts)
    }
    fetchPdts()
  },[])

  const gotoViews=(product)=>{
    setViewProduct(product)
    navigate('/view-post')
  }

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>All products</span>
        </div>
        <div className="cards">
          {products.map((elems)=>{

         return (
            <div key={elems.id} className="card" onClick={()=>gotoViews(elems)} >
              <div className="favorite"><Heart/></div>
              <div className="image">
                <img src={elems.imageURL} alt="bike" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{elems.price}.00</p>
                <span className="kilometer">{elems.products}</span>
                <p className="name">{elems.name}</p>
              </div>
              <div className="date">
                <span>{elems.createAt}</span>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
