import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TravelersModal from "./components/TravelersModal";
import { travelersRef, expensesRef, onValueData } from "./firebase";

import "./App.css";

const Dashboard= () => {
  const [showModal, setShowModal] = useState(false);
  const [travelers, setTravelers] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const unsubscribeTravelers = onValueData(travelersRef, (snapshot) => {
      const travelersArray = [];
      snapshot.forEach((childSnapshot) => {
        const traveler = childSnapshot.val();
        traveler.id = childSnapshot.key;
        travelersArray.push(traveler);
      });
      setTravelers(travelersArray);
    });

    const unsubscribeExpenses = onValueData(expensesRef, (snapshot) => {
      let total = 0;
      snapshot.forEach((childSnapshot) => {
        const expense = childSnapshot.val();
        total += parseFloat(expense.amount);
      });
      setTotalExpenses(total);
    });

    return () => {
      unsubscribeTravelers();
      unsubscribeExpenses();
    };
  }, []);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="container">
      <h1>
        <i className="fas fa-route"></i> Road Wallet
      </h1>
      <h2 className="total">
        Total Expenses:
        <span id="total-expenses-amount">${totalExpenses.toFixed(2)}</span>
      </h2>

      <button id="open-modal-button" onClick={handleModalOpen}>
        <i className="fas fa-users"></i> Manage Travelers
      </button>

      <hr />
      <ExpenseForm />
      <ExpenseList />

      {showModal && (
        <TravelersModal
          onClose={handleModalClose}
          travelers={travelers}
          totalExpenses={totalExpenses}
        />
      )}
    </div>
  );
};

export default Dashboard;
