import ExpenseItem from "@/components/ExpenseItem";
import {useExpense} from "@/context/ExpenseContext";
import {useEffect} from "react";

export default function ExpensesList() {
    const {expenses, fetchData, error, loading} = useExpense()

    useEffect(() => {
        fetchData();
    }, [])



    if (error) return <p className={'text-red-500'}> Błą∂: {error.message}</p>;
    if (loading) return <p>Loading...</p>;
    if (expenses.length === 0) return <div className={'text-center'}>Brak wydatków, dodaj nowe</div>
    return (
        <>
            <div className={'flex flex-row flex-wrap'}>
                {expenses.map(expense=>
                    <ExpenseItem key={expense.id} expense={expense}/>
                )}
            </div>
        </>
    )
}