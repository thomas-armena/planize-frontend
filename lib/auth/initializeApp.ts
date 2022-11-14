import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBvbOhVOSwltHKaleupFmAqpQo92tg6_LE',
    authDomain: 'planize.firebaseapp.com',
    // The value of `databaseURL` depends on the location of the database
    // databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: 'planize',
    // storageBucket: "PROJECT_ID.appspot.com",
    // messagingSenderId: "SENDER_ID",
    // appId: "APP_ID",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    // measurementId: "G-MEASUREMENT_ID",
};

export const firebaseApp = initializeApp(firebaseConfig);
