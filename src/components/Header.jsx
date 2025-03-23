export default function Header({activeView, handleActive}){
    return (
        <div className={'flex flex-row justify-center'}>
            <span className={`mx-4 ${activeView==='expenses'?' border-b-2 border-b-blue-300':'' } cursor-pointer`} onClick={()=>handleActive('expenses')}>Moje wydatki </span>
            <span className={`mx-4 ${activeView==='summary'?' border-b-2 border-b-blue-300':'' } cursor-pointer`} onClick={()=>handleActive('summary')}>podsumowanie </span>
        </div>
    )
}