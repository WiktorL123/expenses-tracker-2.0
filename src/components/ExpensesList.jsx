import ExpenseItem from "@/components/ExpenseItem";
import {useExpense} from "@/context/ExpenseContext";
import {useEffect, useMemo} from "react";
import {useUI} from "@/context/UIContext";

export default function ExpensesList() {
    const {expenses, fetchData, error, loading} = useExpense()
    const {activeCategory} = useUI()


    useEffect(() => {
        fetchData();
    }, [])



   const filteredExpenses =  useMemo(() => {
        if (activeCategory==='all') return expenses
        return expenses.filter(expense =>expense.category === activeCategory)
    }, [expenses, activeCategory])



    if (error) return <p className={'text-red-500'}> Błą∂: {error.message}</p>;
    if (loading) return <p>Loading...</p>;
    if (expenses.length === 0) return <div className={'text-center'}>Brak wydatków, dodaj nowe</div>
    return (
        <>
            <div className={'flex flex-row flex-wrap'}>

                {filteredExpenses.map(expense=>

                    <ExpenseItem key={expense.id} expense={expense}/>
                )}
            </div>
        </>
    )
}
