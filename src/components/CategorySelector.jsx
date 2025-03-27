import {useExpense} from "@/context/ExpenseContext";

export default function CategorySelector({ onChange, selectedCategory}) {
    const { categories } = useExpense()

    return (
        <div>
            <select
                    id="category"
                    className={'border-black border-2'}
                    onChange={onChange}
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