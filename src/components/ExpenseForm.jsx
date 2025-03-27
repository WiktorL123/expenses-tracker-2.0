import {useFormik} from "formik";
import * as Yup from "yup";
import {useExpense} from "@/context/ExpenseContext";
export default function ExpenseForm(){

    const {categories} = useExpense()

    const categoriesNames = Object.keys(categories)

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            amount: 0,
            date: new Date().toISOString().slice(0, 10),
            category: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, "Must be at least 3 characters long")
                .max(20, "Cannot be more than 20 characters long")
                .required('Field is required'),
            description: Yup.string()
                .min(3, "Must be at least 3 characters long")
                .max(20, "Cannot be more than 20 characters long")
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

        }
    })

    return (
        <form></form>
    )
}