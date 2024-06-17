import React from 'react'
import styles from './TxnCard.module.css'
import { BsSuitcase } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { PiPizzaThin, PiGiftThin } from "react-icons/pi";




const TxnCard = ({details, handleDelete, handleEdit}) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.innerBox}>
            <div className={styles.icon}>
                {details.category == 'food' && <PiPizzaThin />}
                {details.category == 'travel' && <BsSuitcase />}
                {details.category == 'entertainment' && <PiGiftThin />}
            </div>
            <div className={styles.info}>
                <h5>{details.title}</h5>
                <p>{details.date}</p>
            </div>
        </div>

        <div className={styles.innerBox}>
            <p className={styles.price}>{`₹${details.price}`}</p>

            <div className={styles.editDeleteWrapper}>
                <button className={styles.edit} onClick={handleEdit}>
                    <MdOutlineModeEdit />
                </button>

                <button className={styles.delete} onClick={handleDelete}>
                    <IoIosCloseCircleOutline />
                </button>
            </div>
        </div>

    </div>
  )
}

export default TxnCard