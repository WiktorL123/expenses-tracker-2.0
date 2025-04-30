import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import {useExpense} from "@/context/ExpenseContext";
import {useEffect} from "react";

export default function  ExpenseItem ({ expense }) {


    const {categories, removeExpense, handleStartEditingExpense} = useExpense()
    const category = categories[expense.category] || {
        label: "Nieznana kategoria",
        icon: "❓",
        color: "#9CA3AF"
    };




    return (
        <div className={`border-2 rounded-xl text-center my-4 py-2 w-fit mx-auto px-2`}
            style={{borderColor: category.color}}
        >
            <p>{expense.name}</p>
            <p>{expense.description}</p>
            <p>{expense.amount} zł</p>
            <p>{expense.date}</p>
            <p>{category.label}</p>
            <span className={'flex-row flex justify-center'}>
                <span className={'px-2 py-2 bg-red-500 cursor-pointer mr-2'}   onClick={() => removeExpense(expense.id)}><FaTrash /></span>
                <span className={'px-2 py-2 bg-green-500 cursor-pointer ml-2'} onClick={()=>  handleStartEditingExpense(expense)}  ><FaPencil /></span>
            </span>
        </div>
    )
};