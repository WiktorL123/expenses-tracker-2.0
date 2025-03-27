import {useExpense} from "@/context/ExpenseContext";

export default function Header(){

    const {activeView, handleIsActive} = useExpense()

    return (
        <div className={'flex flex-row justify-center'}>
            <span className={`mx-4 ${activeView==='expenses'?' border-b-2 border-b-blue-300':'' } cursor-pointer`} onClick={()=>handleIsActive('expenses')}>Moje wydatki </span>
            <span className={`mx-4 ${activeView==='summary'?' border-b-2 border-b-blue-300':'' } cursor-pointer`} onClick={()=>handleIsActive('summary')}>podsumowanie </span>
        </div>
    )
}