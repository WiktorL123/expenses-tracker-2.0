"use client"
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import categories from "@/data/categories";

export const ExpenseContext = createContext(null);

export default function ExpenseProvider({children}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [activeView, setActiveView] = useState('expenses');
    const [selectedSummaryCategory, setSelectedSummaryCategory] = useState('all');
    const [editingExpense, setEditingExpense] = useState(null);


    const addExpense = (newExpense)=>{
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }
    const editExpense = (editingExpense) => {
        setExpenses(prev =>
            prev.map(expense =>
                expense.id === editingExpense.id ? editingExpense : expense
            )
        );
        setEditingExpense(null);
    };


    const handleStartEditingExpense = (expense) => {
        setEditingExpense(expense);
        console.log(editingExpense)
    }
    const handleClearEditingExpense = () => {
        setEditingExpense(null);
    }

    const removeExpense = useCallback((id) => {
        setExpenses(prev=>prev.filter(item => item.id !== id))
    }, [])


    const handleSelectSummaryCategory = (e) => {
        setSelectedSummaryCategory(e.target.value);

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
    useEffect(() => {
        console.log(editingExpense)
    }, [editingExpense]);

    return <ExpenseContext.Provider value={{
        loading,
        error,
        expenses,
        activeView,
        selectedSummaryCategory,
        editingExpense,
        categories,
        handleSelectSummaryCategory,
        handleIsActive,
        removeExpense,
        addExpense,
        editExpense,
        fetchData,
        handleStartEditingExpense,
        handleClearEditingExpense,

    }}>{children}
    </ExpenseContext.Provider>;
}
export const useExpense = () => useContext(ExpenseContext);