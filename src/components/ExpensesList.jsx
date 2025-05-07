import ExpenseItem from "@/components/ExpenseItem";
import {useExpense} from "@/context/ExpenseContext";
import {useEffect, useMemo} from "react";
import {useUI} from "@/context/UIContext";
import {useDebounce} from "@/hooks/useDebounce";

export default function ExpensesList() {
    const {expenses, fetchData, error, loading} = useExpense()
    const {activeFilterCategory, searchQuery} = useUI()
   // const debouncedSearch = useDebounce(searchQuery, 300) <- dobre do żądań API pozwala nałożyć opóźnienie


    useEffect(() => {
        fetchData();
    }, [])



    const filteredExpenses = useMemo(() => {
        return expenses
            .filter(expense =>
                activeFilterCategory === 'all' || expense.category === activeFilterCategory
            )
            .filter(expense =>
                expense.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
    }, [expenses, activeFilterCategory, searchQuery]);




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
