export default function ExpensesAmountSummary({expenses}){
    const calculateSum = () =>{
        return expenses.reduce((sum, cur) => sum + cur.amount, 0);
    }

    return (
        <div>
            <h1>Podsumowanie</h1>
            <div>Łączne wydatki: {calculateSum()} zł</div>
        </div>
    )
}