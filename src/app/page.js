'use client'
import ExpensesList from "@/components/ExpensesList";
import Header from "@/components/Header";
import ExpensesAmountSummary from "@/components/ExpensesAmountSummary";
import ExpenseForm from "@/components/ExpenseForm";
import FilterPanel from "@/components/FilterPanel";
import {useUI} from "@/context/UIContext";



export default function Home() {

    const { activeView } = useUI()


    return (

      <div className={'bg-gray-200'}>
          <Header/>
        <h1 className={'text-center my-4 text-xl'}>
            Śledzenie wydatków
        </h1>

          {activeView==='expenses' && (
              <>

                  <FilterPanel/>
                  <ExpenseForm/>
                  <ExpensesList/>


              </>

          )}
          {activeView==='summary' && <ExpensesAmountSummary/>}
      </div>
  );
}
