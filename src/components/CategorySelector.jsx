import {useExpense} from "@/context/ExpenseContext";

export default function CategorySelector({ onChange, selectedCategory, onBlur= ()=>{}}) {
    const { categories } = useExpense()

    return (
        <div>
            <label htmlFor="category"></label>
            <select
                id="category"
                name="category"
                className={'border-black border-2'}
                onChange={onChange}
                onBlur={onBlur}
                value={selectedCategory}
            >
                <option value={'all'}>Wszystko</option>
                {Object.entries(categories).map(([id, category]) => (
                    <option
                        key={id} value={id}>{category.label} : {category.icon}</option>
                ))}
            </select>
        </div>
    )
}