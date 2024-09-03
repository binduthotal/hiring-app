// var app_fireBase = {};


// Your web app's Firebase configuration
(function () {
 // Your web app's Firebase configuration
 const firebaseConfig = {
 
  apiKey: "AIzaSyBUjecdkpZlzK-qB_v_sG3RCCWwVmTaXgE",

    authDomain: "gvmshiring-36930.firebaseapp.com",

    databaseURL: "https://gvmshiring-36930-default-rtdb.firebaseio.com",

    projectId: "gvmshiring-36930",

    storageBucket: "gvmshiring-36930.appspot.com",

    messagingSenderId: "590471683465",

    appId: "1:590471683465:web:adcb6fe4d42387a2f91558"

};

 // Initialize Firebase
//  const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
// app_fireBase = firebase
})()

const auth = firebase.auth();
// var firebaseOther = firebase.initializeApp(firebaseConfig, "firebaseOther");

// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//       currentUser = user.displayName;
//       email = user.email;
//       uid = user.uid;
//   }
//   })