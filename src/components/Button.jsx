export default function Button({editingExpense, onClick, }) {
    return (
        <button
            className={`border-1 rounded-xl p-2 m-2 text-sm}`}
            onClick={onClick}
        >
            {editingExpense ? 'edytuj wydatek' : 'dodaj wydatek'}</button>
    )
}