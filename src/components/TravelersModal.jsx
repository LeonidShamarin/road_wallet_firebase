import { useState } from "react";
import PropTypes from "prop-types";
import { pushData, setData, removeTraveler, travelersRef } from "../firebase";

const TravelersModal = ({ onClose, travelers, totalExpenses }) => {
  const [newTravelerName, setNewTravelerName] = useState("");

  const addTraveler = (e) => {
    e.preventDefault();
    if (newTravelerName.trim() === "") return;

    const newTravelerRef = pushData(travelersRef);
    setData(newTravelerRef, { name: newTravelerName });
    setNewTravelerName("");
  };

  const calculateAmountOwed = () => {
    if (travelers.length === 0) return {};

    const amountPerTraveler = (totalExpenses / travelers.length).toFixed(2);

    return travelers.reduce((acc, traveler) => {
      acc[traveler.id] = amountPerTraveler;
      return acc;
    }, {});
  };

  const amountOwed = calculateAmountOwed();

  return (
    <div id="travelers-modal" className="modal display-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>

        <form onSubmit={addTraveler}>
          <h2>Add Traveler</h2>
          <label htmlFor="traveler-name">Traveler Name:</label>
          <input
            type="text"
            id="traveler-name"
            value={newTravelerName}
            onChange={(e) => setNewTravelerName(e.target.value)}
            required
          />
          <button type="submit">
            <i className="fas fa-user-plus"></i> Add Traveler
          </button>
        </form>

        <h3>Travelers</h3>
        <div id="travelers-list">
          {travelers.map((traveler) => (
            <div key={traveler.id} className="traveler-item">
              {traveler.name} - ${amountOwed[traveler.id] || "0.00"}
              <button onClick={() => removeTraveler(traveler.id)}>
                <i className="fas fa-trash"></i> Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TravelersModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  travelers: PropTypes.array.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default TravelersModal;