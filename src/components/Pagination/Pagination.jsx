import React from 'react'
import styles from './Pagination.module.css'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const Pagination = ({updatePage, currentPage, totalPages}) => {

    const handlePrev = () => {
        if(currentPage > 1) {
            updatePage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if(currentPage !== totalPages){
            updatePage(prev => prev + 1)
        }
    }

  return (
    <div className={styles.paginationContainer}>
        <button onClick={handlePrev} disabled={currentPage == 1}>
            <IoIosArrowBack />
        </button>

        <p>{currentPage}</p>

        <button onClick={handleNext} disabled={currentPage == totalPages}>
            <IoIosArrowForward />
        </button>
    </div>
  )
}

export default Pagination