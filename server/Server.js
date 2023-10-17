const {initializeApp} = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');

var express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require("./routes/To-DoRoutes")

const cors = require('cors');



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  const fapp = initializeApp(firebaseConfig)


//   .then(()=> console.log('firebase connected !!!'))
//   .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 4000;
const db = getFirestore(fapp);


//MiddleWare
app.use(cors());
app.use(express.json());





mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err)=> console.log(err));

    app.use("/api", routes);

    async function getfire(db) {
        const citiesCol = collection(db, 'to-do');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        console.log(cityList)
        return cityList
      } 
    
    getfire(db);
    
    app.get('/firebase/api/get', async (req,res) => {
       const data=await getfire(db)
        res.status(200).json(data)
      } )

app.listen(PORT, () => {console.log(`Server is running on port: ${PORT}`)});
