import * as firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGTSe6DjLheNUWHiPH7Cx26aSosg9UoSA",
  authDomain: "hello-react-native-5f415.firebaseapp.com",
  databaseURL: "https://hello-react-native-5f415.firebaseio.com",
  storageBucket: "hello-react-native-5f415.appspot.com"
}

firebase.initializeApp(firebaseConfig)

export default firebase