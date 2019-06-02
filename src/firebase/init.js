import firebase from 'firebase'
// import firestore from 'firebase/firestore'
//config file  
import {firebaseConfig} from './fireconf'
// console.log(firebaseConfig); 

 const firebaseApp = firebase.initializeApp(firebaseConfig)
//  firebaseApp.firestore().settings

//export firestore database 
export const db = firebaseApp.firestore()

//export 
export const smoothies = db.collection('smoothies')