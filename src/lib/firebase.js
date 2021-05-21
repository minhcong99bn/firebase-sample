import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBAagRf2rj-kkbLtCoJ0cx1YxS2giLRrME",
    authDomain: "fir-sample-1b779.firebaseapp.com",
    projectId: "fir-sample-1b779",
    storageBucket: "fir-sample-1b779.appspot.com",
    messagingSenderId: "133611782377",
    appId: "1:133611782377:web:f4a38f79439695824d7078",
    measurementId: "G-BLMNXTY3LN"
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


const db = firebase.firestore();

export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
};

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
};

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};
