import {useMemo} from "react";
import CategorySelector from "@/components/CategorySelector";

export default function ExpensesAmountSummary({expenses, categories, onChange, selectedCategory}){
    const total = useMemo(() => {
        return expenses.reduce((acc, cur)=>acc + cur.amount, 0)
    }, [expenses]);


    return (
        <div>
            <CategorySelector categories={categories} onChange = {onChange} selectedCategory={selectedCategory}/>
            <div className={'text-center'}>Łączne wydatki: {total} zł</div>
        </div>
    )
}