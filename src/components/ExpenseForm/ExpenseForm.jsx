import React, { useState, useEffect } from 'react'
import styles from './ExpenseForm.module.css'
import Button from '../Button/Button'
import { useSnackbar } from 'notistack'


const ExpenseForm = ({setIsOpen, expenseList, setExpenseList, editId, balance, setBalance}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        date: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAdd = (e) => {
        e.preventDefault();

        if(balance < Number(formData.price)){
            enqueueSnackbar("Price should be less than the wallet balance", {variant: "warning"})
            setIsOpen(false)
            return
        }

        setBalance(prev => prev - Number(formData.price))

        const lastId = expenseList.length > 0 ? expenseList[0].id : 0
        setExpenseList(prev => [{...formData, id: lastId + 1 }, ...prev])

        setFormData({
            title: '',
            price: '',
            category: '',
            date: '',
        })

        setIsOpen(false)
    }


    const handleEdit = (e) => {
        e.preventDefault();

        const updated = expenseList.map((item) => {

            if(item.id == editId){

                const priceDifference = item.price - Number(formData.price)

                if(priceDifference < 0 && Math.abs(priceDifference) > balance) {
                    enqueueSnackbar("Price should not exceed the wallet balance", {variant: "warning"})
                    setIsOpen(false)
                    return {...item}
                }

                setBalance(prev => prev + priceDifference)
                return {...formData, id: editId}
            }

            else{
                return item
            }
        })

        setExpenseList(updated)

        setIsOpen(false)
    }

    useEffect(() => {
        if(editId){
            const toEditData = expenseList.find(item => item.id == editId)

            setFormData({
                title: toEditData.title,
                price: toEditData.price,
                category: toEditData.category,
                date: toEditData.date
            })
        }
    }, [editId])




  return (
    <div className={styles.formContainer}>
        <h3>{editId ? 'Edit Expense' : 'Add Expense'}</h3>
        <form onSubmit={editId ? handleEdit : handleAdd}>
            <input type="text" name="title" placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <input type="number" name="price" placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
            />

            <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            >
                <option value="" disabled>Select Category</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
            </select>

            <input type="date" name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <Button type="submit" style="primary" shadow>
                {editId ? "Edit Expense" : "Add Expense"}
            </Button>

            <Button style="secondary" shadow handleClick={() => setIsOpen(false)}>
                Cancel
            </Button>
        </form>
    </div>
  )
}

export default ExpenseForm