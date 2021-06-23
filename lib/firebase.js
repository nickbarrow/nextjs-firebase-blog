// This is where we'll add all of the functions for interacting with
// Firebase services in our app.

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const initFirebase = async () => {
  // This check prevents us from initializing more than one app.
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyDCTQ_m96KhmhXuF3NlgBljUTPETvlBRyY',
      authDomain: 'beerpropertiesinc.firebaseapp.com',
      databaseURL: 'https://beerpropertiesinc-default-rtdb.firebaseio.com',
      projectId: 'beerpropertiesinc',
      storageBucket: 'beerpropertiesinc.appspot.com',
      messagingSenderId: '839498375673',
      appId: '1:839498375673:web:cfeb59d9becde07bd9dd28'
    })
  }
}

// ======================
// TIME FOR MY GARBARGE
// ======================
export const getProperties = async () => {
  initFirebase() // dudnt hurt 🤷‍♂️

  var propertiesRef = firebase.firestore().collection('properties')

  let activeRef = await propertiesRef.get(),
    properties = []

  for (var doc of activeRef.docs) {
    let propertyDoc = await propertiesRef.doc(doc.id).get()
    let property = propertyDoc.data()
    property.id = propertyDoc.id
    properties.push(property)
  }

  return properties
}

export const getPropertyByID = async (propertyID) => {
  initFirebase()

  let propertyDoc = await firebase
    .firestore()
    .collection('properties')
    .doc(propertyID)
    .get()

  return propertyDoc.data()
}

export const updateProperty = async (propertyID, form) => {
  initFirebase();

  await firestore.collection('properties').doc(propertyID).set(form)
}
// ======================
// END MY GARBARGE
// ======================

/*
Observes changes in authentication. Receives a callback function that is invoked
when auth state changes. See the Firebase Reference Docs for all of the details:
https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
*/
export const onAuthStateChanged = async (callback) => {
  initFirebase()

  return firebase.auth().onAuthStateChanged((user) => callback(user))
}

/*
Attempts to authenticate a user with a given email and password.
*/
export const signIn = async (email, password) => {
  initFirebase()

  return firebase.auth().signInWithEmailAndPassword(email, password)
}

/*
Signs out the authenticated user.
*/
export const signOut = async () => {
  initFirebase()

  return firebase.auth().signOut()
}

/*
Updates the data for the given post in the database.
*/
export const updatePost = async (post) => {
  initFirebase()

  return firebase.database().ref(`/posts/${post.slug}`).set(post)
}

/*
Deletes a post from the database.
*/
export const deletePost = async (slug) => {
  initFirebase()

  return firebase.database().ref(`/posts/${slug}`).set(null)
}

// Google Sign In Provider
const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider)

initFirebase()
export const store = firebase.storage()
export const firestore = firebase.firestore()