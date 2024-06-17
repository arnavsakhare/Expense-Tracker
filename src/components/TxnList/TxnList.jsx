import React, {useState, useEffect} from 'react'
import TxnCard from '../TxnCard/TxnCard'
import styles from './TxnList.module.css'
import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import ExpenseForm from '../ExpenseForm/ExpenseForm'


const TxnList = ({transactions, editTransactions, balance, setBalance}) => {

    const [editId, setEditId] = useState(0)
    const [isDisplayEditor, setIsDisplayEditor] = useState(false)
    const [currentTransactions, setCurrentTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const maxRecords = 3

    const handleDelete = (id) => {
        const item = transactions.find(i => i.id == id)

        const price = Number(item.price)
        setBalance(prev => prev + price)

        editTransactions(prev => (
            prev.filter(item => item.id !== id)
        ))
    }

    const handleEdit = (id) => {
        setEditId(id)
        setIsDisplayEditor(true)
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * maxRecords
        const endIndex = Math.min(currentPage * maxRecords, transactions.length)

        setCurrentTransactions([...transactions.slice(startIndex, endIndex)])
        setTotalPages(Math.ceil(transactions.length / maxRecords))

    }, [currentPage, transactions])



    useEffect(() => {
        if(currentPage > totalPages && currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }
    }, [totalPages])


  return (
    <div className={styles.txnListContainer}>
        <h2>Recent Transactions</h2>

        {transactions.length > 0 ? (
            <div className={styles.list}>
                <div>
                    {currentTransactions.map(transaction => (
                        <TxnCard
                            details={transaction}
                            key={transaction.id}
                            handleDelete={() => handleDelete(transaction.id)}
                            handleEdit={() => handleEdit(transaction.id)}
                        />
                    ))}
                </div>

                {totalPages > 1 && (

                    <Pagination
                        updatePage={setCurrentPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                )}
            </div>
        ) : (
            <div className={styles.emptyTxn}>
                <p>No Transations !</p>
            </div>
        )}


        <Modal isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
            <ExpenseForm
                editId={editId}
                expenseList={transactions}
                setExpenseList={editTransactions}
                setIsOpen={setIsDisplayEditor}
                balance={balance}
                setBalance={setBalance}
            />
        </Modal>


    </div>
  )
}

export default TxnList