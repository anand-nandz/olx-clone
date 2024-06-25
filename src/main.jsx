
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import FirebaseContext from "./Storage/firebaseContext.jsx";
import { UserContextProvider } from "./Storage/userContext.jsx";
import firebaseApp from "./firebase/firebase.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={firebaseApp}>
    <UserContextProvider>
      <App/>
    </UserContextProvider>
  </FirebaseContext.Provider>

  </React.StrictMode>
  
);
