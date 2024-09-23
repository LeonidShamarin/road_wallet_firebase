// src/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  set,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  databaseURL: import.meta.env.VITE_ROAD_WALLET_DB,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

const handleDelete = (expenseId) => {
  // Create a reference to the specific expense item
  const expenseRef = ref(database, `expenses/${expenseId}`);

  // Remove the item
  remove(expenseRef)
    .then(() => {
      console.log("Expense deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting expense: ", error);
    });
};

const removeTraveler = (travelerId) => {
  // Create a reference to the specific traveler item
  const travelerRef = ref(database, `travelers/${travelerId}`);

  // Remove the item
  remove(travelerRef)
    .then(() => {
      console.log("Traveler deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting traveler: ", error);
    });
};


// Initialize Firebase Database and references
const database = getDatabase(app);
export const expensesRef = ref(database, "expenses"); // Reference to expenses in the database
export const travelersRef = ref(database, "travelers"); // Reference to travelers in the database

export { handleDelete };
export { removeTraveler };

export const pushData = push;
export const onValueData = onValue;
export const removeData = remove;
export const setData = set;
