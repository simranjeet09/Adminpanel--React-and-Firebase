import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDGCeL9P3p7Yq131aLDfKQ_fkSTFTO5LVU',
    authDomain: 'assignment3-a09cd.firebaseapp.com',
    databaseURL: 'https://react-firebase-fc06e.firebaseio.com',
    projectId: 'assignment3-a09cd',
    storageBucket: 'assignment3-a09cd.appspot.com',
    messagingSenderId: 220071043652,
    appId: '1:220071043652:web:e2974e1551c1b29bd9d211',
    measurementId: 'G-2TQLL9X6WH',
};
  firebase.initializeApp(firebaseConfig);

export   {firebase};
