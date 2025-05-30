'use client'

import {createContext, useContext, useState} from "react";

const UIContext = createContext(null);





export default function UIProvider({children}) {
    const [activeView, setActiveView] = useState('expenses')
    const [activeFilterCategory, setActiveFilterCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const handleActiveView = (view) => {
        setActiveView(view);
    }
    const handleCategoryChange = (e) =>{
        setActiveFilterCategory(e.target.value)
    }
    const handleQueryChange = (e) =>{
        setSearchQuery(e.target.value)
    }
    return (
        <UIContext.Provider
            value={{
                activeView,
                searchQuery,
                activeFilterCategory,
                handleActiveView,
                handleCategoryChange,
                handleQueryChange
            }}
        >
            {children}
        </UIContext.Provider>
    )
}

export const useUI = () => useContext(UIContext);