import {useFormik} from "formik";
import * as Yup from "yup";
import {useExpense} from "@/context/ExpenseContext";
import CategorySelector from "@/components/CategorySelector";
import {useEffect} from "react";
export default function ExpenseForm(){

    const {categories, editingExpense, addExpense, editExpense, handleClearEditingExpense} = useExpense()

    const categoriesNames = Object.keys(categories)

    const formik = useFormik({
        initialValues:
             {
                name: "",
                description: "",
                amount: 1,
                date: new Date().toISOString().slice(0, 10),
                category: '',
            },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, "Must be at least 3 characters long")
                .max(50, "Cannot be more than 50 characters long")
                .required('Field is required'),
            description: Yup.string()
                .min(3, "Must be at least 3 characters long")
                .max(50, "Cannot be more than 50 characters long")
                .required('Field is required'),
            amount: Yup.number()
                .positive('Cannot be less than zero')
                .required('Field is required'),
            date: Yup.string()
                .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
                .required("Field is required"),
            category: Yup.string()
                .oneOf(categoriesNames, 'value is not valid')
                .required('Field is required')
        }),
        onSubmit: (values) =>{
            if (editingExpense===null) {
                const newExpense = {
                    id: Date.now(),
                    name: values.name,
                    description: values.description,
                    amount: values.amount,
                    date: values.date,
                    category: values.category,
                }
                addExpense(newExpense)
            }
            else {

                const updatedExpense = {
                    ...editingExpense,
                    ...values,
                }
                editExpense(updatedExpense)
                handleClearEditingExpense()
            }

            formik.resetForm()
        }
    })

    useEffect(() => {
        formik.setValues({
            name: editingExpense?.name || '',
            description: editingExpense?.description || '',
            amount: editingExpense?.amount || '',
            date: editingExpense?.date || new Date().toISOString().slice(0, 10),
            category: editingExpense?.category || ''

            })
    }, [editingExpense])

    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <label htmlFor="name"> Nazwa</label>
            <input
                id='name'
                name='name'
                type='text'
                placeholder='kurs react'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            {formik.errors.name && formik.touched.name && (<p className={'text-red-500'}> {formik.errors.name} </p>)}

            <label htmlFor='description'></label>
            <input
                id='description'
                name='description'
                type='text'
                placeholder='mam nadzieje że się czegoś nauczę'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
            />
            {formik.errors.description && formik.touched.description && (<p className={'text-red-500'}> {formik.errors.description} </p>)}

            <label htmlFor="amount"></label>
            <input
                id='amount'
                name='amount'
                type='number'
                placeholder='69'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
            />

            {formik.errors.amount && formik.touched.amount && (<p className={'text-red-500'}> {formik.errors.amount} </p>)}

            <label htmlFor="date"></label>
            <input
                id='date'
                name='date'
                type='date'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
            />
            {formik.errors.date && formik.touched.date && (<p className={'text-red-500'}> {formik.errors.date} </p>)}


            <CategorySelector
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                selectedCategory={formik.values.category}

            />
            {formik.errors.category && formik.touched.category && (<p className={'text-red-500'}> {formik.errors.category} </p>)}

        <button>{editingExpense!==null? 'edytuj wydatek' : 'dodaj wydatek'}</button>
            {editingExpense!==null &&(<button
                onClick={() => {
                    handleClearEditingExpense()
                    formik.resetForm()
                }}
                type='button'
            >anuluj</button>)}
        </form>
    )
}