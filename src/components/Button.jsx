export default function Button({ onClick, children }) {
    return (
        <button
            className={`border-1 rounded-xl p-2 m-2 text-sm}`}
            onClick={onClick}
        >
            {children}</button>
    )
}