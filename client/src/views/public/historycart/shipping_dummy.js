import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import React, { useState, useEffect } from 'react';
var dummy = [

]

function App() {
  const [data, setData] = useState();
  const getData = ref(db);

  useEffect(() => {
    const fetchData = () => {
      ref.once("value").then((snapshot) => {
        const fetched = snapshot.val();
        setData(fetched);
      }); 
    };
    fetchData();
  }, []);
}

var ref = db.ref("users/-N5CLaOuaBEdNvv7t5MU/cart");
ref.once("value")
.then( function(snapshot) {
  var snapshot_value = snapshot.val();
    ref.off();

});
export default dummy;