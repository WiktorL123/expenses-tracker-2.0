import ExpenseItem from "@/components/ExpenseItem";

export default function ExpensesList({expenses, onRemove, categories}) {
    if (expenses.length === 0)
        return <div className={'text-center'}>Brak wydatków, dodaj nowe</div>

    return (
        <>
            <div className={'flex flex-row flex-wrap'}>
                {expenses.map(expense=>
                    <ExpenseItem key={expense.id} expense={expense} onRemove={onRemove} categories={categories} />
                )}
            </div>
        </>
    )
}