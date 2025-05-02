"use client"
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import categories from "@/data/categories";

export const ExpenseContext = createContext(null);

export default function ExpenseProvider({children}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
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


    const fetchData = async () => {
        const local =  localStorage.getItem("expenses");
        if (local) {
            setExpenses(JSON.parse(local));
            setLoading(false);
        }
        else {
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
    }



    useEffect(() => {
        if (!loading && expenses.length > 0) {
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }
    }, [expenses, loading])


    return <ExpenseContext.Provider value={{
        loading,
        error,
        expenses,
        selectedSummaryCategory,
        editingExpense,
        categories,
        handleSelectSummaryCategory,
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