
import { useEffect, useState } from "react";
import { expensesRef, onValueData,  handleDelete } from "../firebase";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    // Встановлення реального часу слухача на зміни в базі даних
    const unsubscribe = onValueData(expensesRef, (snapshot) => {
      const expensesArray = [];
      snapshot.forEach((childSnapshot) => {
        const expense = childSnapshot.val();
        expense.id = childSnapshot.key; // Зберігаємо ключ як id
        expensesArray.push(expense);
      });
      setExpenses(expensesArray); // Оновлюємо стан компоненту
    });

    // Видалення слухача при демонтажі компоненту
    return () => unsubscribe();
  }, []);



  return (
    <ul id="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <span>
            {expense.category}: ${expense.amount}
          </span>
          <button onClick={() => handleDelete(expense.id)}>
            <i className="fas fa-trash"></i> Remove
          </button>
        </li>
      ))}
    </ul>
  );
};



export default ExpenseList;
