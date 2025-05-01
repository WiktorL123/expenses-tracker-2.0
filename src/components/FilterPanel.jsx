import CategorySelector from "@/components/CategorySelector";
import {useExpense} from "@/context/ExpenseContext";
import {useUI} from "@/context/UIContext";
import {useEffect} from "react";

export default function FilterPanel(){

    const {activeCategory, handleCategoryChange} = useUI();


    useEffect(() => {
        console.log('kategoria w filtach', activeCategory);
    }, [activeCategory]);
    return (
        <div>
            filtracja po kategori
            <CategorySelector
                selectedCategory={activeCategory}
                onChange={handleCategoryChange}
            />
        </div>
    )
}