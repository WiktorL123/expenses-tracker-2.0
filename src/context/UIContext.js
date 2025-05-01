'use client'

import {createContext, useContext, useState} from "react";

const UIContext = createContext(null);





export default function UIProvider({children}) {
    const [activeView, setActiveView] = useState('expenses')
    const [activeFilterCategory, setActiveFilterCategory] = useState('all')

    const handleActiveView = (view) => {
        setActiveView(view);
    }
    const handleCategoryChange = (e) =>{
        setActiveFilterCategory(e.target.value)
    }
    return (
        <UIContext.Provider
            value={{
                activeView,
                activeCategory: activeFilterCategory,
                handleActiveView,
                handleCategoryChange,
            }}
        >
            {children}
        </UIContext.Provider>
    )
}

export const useUI = () => useContext(UIContext);