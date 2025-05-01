
import {useUI} from "@/context/UIContext";

export default function Header(){

    const {activeView, handleActiveView} = useUI()

    return (
        <div className={'flex flex-row justify-center'}>
            <span className={`mx-4 ${activeView==='expenses'?' border-b-2 border-b-blue-300':'' } cursor-pointer`} onClick={()=>handleActiveView('expenses')}>Moje wydatki </span>
            <span className={`mx-4 ${activeView==='summary'?' border-b-2 border-b-blue-300':'' } cursor-pointer`} onClick={()=>handleActiveView('summary')}>podsumowanie </span>
        </div>
    )
}