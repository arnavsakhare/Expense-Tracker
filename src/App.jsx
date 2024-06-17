import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card'
import PieTrends from './components/PieTrends/PieTrends';
import TxnList from './components/TxnList/TxnList';
import BarTrends from './components/BarTrends/BarTrends';
import Modal from './components/Modal/Modal';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import AddBalanceForm from './components/AddBalanceForm/AddBalanceForm';

function App() {

    const [balance, setBalance] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    const [isOpenBalance, setIsOpenBalance] = useState(false);
    const [isOpenExpense, setIsOpenExpense] = useState(false);

    const [categorySpends, setCategorySpends] = useState({
        food: 0,
        travel: 0,
        entertainment: 0,
    })


    useEffect(() => {

        const localBalance = localStorage.getItem("balance")

        if(localBalance) {
            setBalance(Number(localBalance))
        } else {
            setBalance(5000)
            localStorage.setItem("balance", 5000)
        }

        const items = JSON.parse(localStorage.getItem("expenses"))

        setExpenseList(items || [])
        setIsMounted(true)

    }, [])


    useEffect(() => {
        if(expenseList.length > 0 || isMounted) {
            localStorage.setItem("expenses", JSON.stringify(expenseList))
        }

        if(expenseList.length > 0) {
            setExpenses(expenseList.reduce((acc, curr) => acc + Number(curr.price), 0))
        } else {
            setExpenses(0)
        }

        let foodSpends = 0;
        let entertainmentSpends = 0;
        let travelSpends = 0;

        expenseList.forEach((item) => {
            if(item.category == "food") {
                foodSpends += Number(item.price)
            } else if (item.category == "travel") {
                travelSpends += Number(item.price)
            } else if (item.category == "entertainment") {
                entertainmentSpends += Number(item.price)
            }
        })


        setCategorySpends({
            food: foodSpends,
            travel: travelSpends,
            entertainment: entertainmentSpends
        })

    }, [expenseList])


    useEffect(() => {
        if(isMounted) {
            localStorage.setItem("balance", balance)
        }
    }, [balance])




  return (
    <div className='container'>
        <h1>Expense Tracker</h1>

        <div className='dashboard'>
          <Card
            title="Wallet Balance"
            money={balance}
            buttonText="+ Add Income"
            buttonType="income"
            handleClick={() => setIsOpenBalance(true)}
          />

          <Card
            title="Expenses"
            money={expenses}
            buttonText="+ Add Expenses"
            buttonType="expense"
            success={false}
            handleClick={() => setIsOpenExpense(true)}
          />

          <PieTrends
              data={[
                {name: "Food", value: categorySpends.food},
                {name: "Entertainment", value: categorySpends.entertainment},
                {name: "Travel", value: categorySpends.travel}
              ]}
          />

        </div>

        <div className='txnBarwrapper'>
            <TxnList
              transactions={expenseList}
              editTransactions={setExpenseList}
              balance={balance}
              setBalance={setBalance}
            />

            <BarTrends
              data={[
                {name: "Food", value: categorySpends.food},
                {name: "Entertainment", value: categorySpends.entertainment},
                {name: "Travel", value: categorySpends.travel}
              ]}
            />
        </div>

        <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
          <ExpenseForm
            setIsOpen={setIsOpenExpense}
            expenseList={expenseList}
            setExpenseList={setExpenseList}
            balance={balance}
            setBalance={setBalance}
          />
        </Modal>

        <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
          <AddBalanceForm
            setIsOpen={setIsOpenBalance}
            setBalance={setBalance}
          />
        </Modal>
        
    </div>
  )
}

export default App
