import CategorySelector from "@/components/CategorySelector";
import {useExpense} from "@/context/ExpenseContext";
import {useUI} from "@/context/UIContext";
import {useEffect} from "react";
import Input from "@/components/Input";

export default function FilterPanel(){

    const {activeFilterCategory, handleCategoryChange, handleQueryChange, searchQuery} = useUI();
    useEffect(()=>{
        console.log('query: ',searchQuery )
    }, [searchQuery])

    return (
        <div className={'border-1 flex flex-col items-center justify-center'}>
            <h1>filtruj wydatki</h1>
            <p>według kategorii</p>
            <CategorySelector
                selectedCategory={activeFilterCategory}
                onChange={handleCategoryChange}
            />
            <h1>lub wyszukaj po nazwie</h1>
            <Input
            placeholder={'nazwa produktu'}
            onChange={handleQueryChange}/>
        </div>
    )
}