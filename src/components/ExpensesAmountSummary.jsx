import {useMemo} from "react";
import CategorySelector from "@/components/CategorySelector";
import {useExpense} from "@/context/ExpenseContext";

export default function ExpensesAmountSummary(){


    const {expenses, handleSelectSummaryCategory, selectedSummaryCategory} = useExpense();

    const total = useMemo(() => {
        return expenses.reduce((acc, cur)=>acc + cur.amount, 0)
    }, [expenses]);


    return (
        <div>
            <CategorySelector  onChange ={handleSelectSummaryCategory} selectedCategory={selectedSummaryCategory}/>
            <div className={'text-center'}>Łączne wydatki: {total} zł</div>
        </div>
    )
}