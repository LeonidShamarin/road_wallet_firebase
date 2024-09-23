import { useState } from "react";

import { expensesRef, pushData, setData } from "../firebase";

const ExpenseForm = () => {
  const [expense, setExpense] = useState({ category: "food", amount: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpenseRef = pushData(expensesRef);
    setData(newExpenseRef, expense); // Додавання нової витрати в базу даних
    setExpense({ category: "food", amount: 0 }); // Очищення полів форми після додавання
  };

  return (
    <form id="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <label htmlFor="expense-category">Category:</label>
      <select
        id="expense-category"
        name="category"
        value={expense.category}
        onChange={handleChange}
      >
        <option value="food">Food</option>
        <option value="gas">Gas</option>
        <option value="transport">Transport</option>
        <option value="accommodations">Accommodations</option>
        <option value="sightseeing">Sightseeing</option>
        <option value="health & medical">Health & Medical</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
      <label htmlFor="expense-amount">Amount:</label>
      <input
        type="number"
        id="expense-amount"
        name="amount"
        min="0"
        value={expense.amount}
        onChange={handleChange}
        required
      />
      <button type="submit">
        <i className="fas fa-plus"></i> Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
