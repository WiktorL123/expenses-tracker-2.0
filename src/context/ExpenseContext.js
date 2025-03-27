"use client"
import {createContext, useContext, useState} from "react";

export const ExpenseContext = createContext(null);

export default function ExpenseProvider({children}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [ActiveView, setActiveView] = useState('expenses');
    const [selectedSummaryCategory, setSelectedSummaryCategory] = useState('all');


    const handleSelectSummaryCategory = (e) => {
        setSelectedSummaryCategory(e.target.value);

    }

    const removeExpense = (id) => {
        setExpenses(prev=>prev.filter(item => item.id !== id))
    }


    const handleIsActive = (view) => {
        setActiveView(view);
    }
    const fetchData = async () => {
        try {
            const response = await fetch("expenses.json");
            if (!response.ok) {
                throw new Error("failed to fetch data.");
            }
            const data = await response.json();
            setExpenses(data);

        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    }


    return <ExpenseContext.Provider value={{
        loading,
        error,
        expenses,
        ActiveView,
        selectedSummaryCategory,
        handleSelectSummaryCategory,
        handleIsActive,
        removeExpense,
        fetchData,

    }}>{children}
    </ExpenseContext.Provider>;
}
export const useExpense = () => useContext(ExpenseContext);