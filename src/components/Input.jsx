export default function Input(
    {   id,
        name,
        type,
        placeholder,
        onChange,
        onBlur,
        value,
        error,
        touched,
        label

}){
   return (
       <div className={'flex flex-col items-center justify-center'}>
           {label && (<label htmlFor={id}>{label}</label>)}
           <input
               id={id}
               name={name}
               type={type}
               placeholder={placeholder}
               onChange={onChange}
               onBlur={onBlur}
               value={value}
           />
           {error && touched && (<p className={'text-red-500'}>{error}</p>)}
       </div>

   )
}