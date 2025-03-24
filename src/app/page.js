'use client'
import {useEffect, useState} from "react";
import ExpensesList from "@/components/ExpensesList";
import Header from "@/components/Header";
import ExpensesAmountSummary from "@/components/ExpensesAmountSummary";
import categories from "@/data/categories";

export default function Home() {
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
  useEffect(() => {
      fetchData();
  }, [])
    useEffect(() => {
        console.log(selectedSummaryCategory);
    }),[selectedSummaryCategory]
    if (error) return <p className={'text-red-500'}> Błą∂: {error.message}</p>;
    if (loading) return <p>Loading...</p>;

    return (

      <div className={'bg-gray-200'}>
          <Header activeView={ActiveView} handleActive={handleIsActive}/>
        <h1
            className={'text-center my-4 text-xl'}
        >
            Śledzenie wydatków
        </h1>
          {ActiveView==='expenses' && <ExpensesList expenses={expenses} onRemove={removeExpense} categories={categories} />}
          {ActiveView==='summary' && <ExpensesAmountSummary expenses={expenses} categories={categories} onChange={handleSelectSummaryCategory} selectedCategory={selectedSummaryCategory}/>}
      </div>
  );
}
