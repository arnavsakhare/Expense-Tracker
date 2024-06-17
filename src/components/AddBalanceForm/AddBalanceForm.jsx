import React, {useState} from 'react'
import styles from './AddBalanceForm.module.css'
import Button from '../Button/Button'
import { useSnackbar } from 'notistack'


const AddBalanceForm = ({setIsOpen, setBalance}) => {

    const [income, setIncome] = useState('')
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit =(e) => {
        e.preventDefault();

        if(Number(income) < 0){
            enqueueSnackbar("Income should be greater than 0", {variant: "warning"});
            setIsOpen(false);
            return
        }

        setBalance(prev => prev + Number(income));
        setIsOpen(false);
    }

  return (
    <div className={styles.formContainer}>
        <h3>Add Balance</h3>
        <form onSubmit={handleSubmit}>

            <input 
                type="number"
                placeholder="Add Income"
                value={income} 
                onChange={(e) => setIncome(e.target.value)}
                required
            />

            <Button 
                type="submit" 
                style="primary" 
                shadow
            >
                Add Balance
            </Button>

            <Button
                style="secondary"
                shadow
                handleClick={() => setIsOpen(false)}
            >
                Cancel
            </Button>
        </form>
    </div>
  )
}

export default AddBalanceForm