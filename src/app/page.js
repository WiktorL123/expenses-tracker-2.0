'use client'
import ExpensesList from "@/components/ExpensesList";
import Header from "@/components/Header";
import ExpensesAmountSummary from "@/components/ExpensesAmountSummary";
import {useExpense} from "@/context/ExpenseContext";
import ExpenseForm from "@/components/ExpenseForm";
import Button from "@/components/Button";

export default function Home() {

    const { activeView } = useExpense()

    return (

      <div className={'bg-gray-200'}>
          <Header/>
        <h1 className={'text-center my-4 text-xl'}>
            Śledzenie wydatków
        </h1>

          {activeView==='expenses' && (
              <>
                  <ExpenseForm/>
                  <ExpensesList/>

              </>

          )}
          {activeView==='summary' && <ExpensesAmountSummary/>}
      </div>
  );
}
