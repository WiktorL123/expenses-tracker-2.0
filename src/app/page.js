'use client'
import {useEffect, useState} from "react";
import ExpensesList from "@/components/ExpensesList";
import Header from "@/components/Header";
import ExpensesAmountSummary from "@/components/ExpensesAmountSummary";
import categories from "@/data/categories";
import {useExpense} from "@/context/ExpenseContext";

export default function Home() {

    const {expenses, fetchData, error, loading, ActiveView, handleIsActive, selectedSummaryCategory, handleSelectSummaryCategory, removeExpense } = useExpense()

  useEffect(() => {
      fetchData();
  }, [])
    useEffect(() => {
        console.log(selectedSummaryCategory);
    },[selectedSummaryCategory])
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
