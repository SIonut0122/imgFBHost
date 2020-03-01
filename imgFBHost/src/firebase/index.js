import 'core-js';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';
const apikey = `${process.env.REACT_APP_API_KEY}`

 

 
  var config = {
    apiKey: apikey,
    authDomain: "uploadimages-8cd3d.firebaseapp.com",
    databaseURL: "uploadimages-8cd3d.firebaseio.com/",
    projectId: "uploadimages-8cd3d",
    storageBucket: "gs://uploadimages-8cd3d.appspot.com",
    messagingSenderId: "352007639809"
  };

  firebase.initializeApp(config);

    // storage database
  const storage = firebase.storage();

      // messages database
  let messagesRef = firebase.database().ref('messages');

    // get data from database
  let getDataBase = firebase.database();
  let dataRef     = getDataBase.ref('messages');

  // data from current user

  export {
  	storage, firebase, messagesRef, dataRef as default
  }