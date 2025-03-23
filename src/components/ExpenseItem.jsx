import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";

export default function  ExpenseItem ({expense, onRemove}) {
    return (
        <div className={'border rounded-xl text-center my-4 py-2 w-fit mx-auto px-2'}>
            <p>{expense.name}</p>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.date}</p>
            <p>{expense.category}</p>
            <span className={'flex-row flex justify-center'}>
                <span className={'px-2 py-2 bg-red-500 cursor-pointer mr-2'} onClick={() => onRemove(expense.id)}><FaTrash /></span>
                <span className={'px-2 py-2 bg-green-500 cursor-pointer ml-2'}><FaPencil /></span>
            </span>
        </div>
    )
};