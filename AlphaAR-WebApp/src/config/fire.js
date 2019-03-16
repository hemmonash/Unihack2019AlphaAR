import firebase from 'firebase';

const config ={
    apiKey: "AIzaSyC3LfYaDt7jk1YVmxwiSWphPQSeuU4VZqE",
    authDomain: "alpha-ar-1e5d6.firebaseapp.com",
    databaseURL: "https://alpha-ar-1e5d6.firebaseio.com",
    projectId: "alpha-ar-1e5d6",
    storageBucket: "alpha-ar-1e5d6.appspot.com",
    messagingSenderId: "284565069399"
}

const fire = firebase.initializeApp(config);
export default fire;