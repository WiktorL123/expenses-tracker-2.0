import {useFormik} from "formik";
import * as Yup from "yup";
import {useExpense} from "@/context/ExpenseContext";
import CategorySelector from "@/components/CategorySelector";

import Button from "@/components/Button";

import {useEffect} from "react";
import Input from "@/components/Input";

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
            <Input
                id={'name'}
                name={'name'}
                type={'text'}
                placeholder={'kurs'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.errors.name}
                touched={formik.touched.name}
                label={'nazwa'}

            />

            <Input
                id={'description'}
                name={'description'}
                type={'text'}
                placeholder={'promocja sie nie dlugo konczy'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                error={formik.errors.description}
                touched={formik.touched.description}
                label={'opis'}
            />

            <Input
                id={'amount'}
                name={'amount'}
                type={'number'}
                placeholder={'1'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                error={formik.errors.amount}
                touched={formik.touched.amount}
                label={'kwota'}
            />

            <Input
                id={'date'}
                name={'date'}
                type={'date'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                error={formik.errors.date}
                touched={formik.touched.date}
                label={'data'}
            />


            <CategorySelector
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                selectedCategory={formik.values.category}

            />
            {formik.errors.category && formik.touched.category && (<p className={'text-red-500'}> {formik.errors.category} </p>)}


            <Button>
                {editingExpense ? 'edytuj wydatek' : 'dodaj wydatek'}
            </Button>
            {editingExpense && (
                <Button
                children={'aaa'}
                onClick={()=>{
                    handleClearEditingExpense();
                    formik.resetForm()
                }}
                >
                    anuluj edycje
                </Button>)}
        </form>
    )
}