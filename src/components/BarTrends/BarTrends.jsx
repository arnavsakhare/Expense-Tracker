import React from 'react'
import styles from './BarTrends.module.css'
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from "recharts";
  

const BarTrends = ({data}) => {
  return (
    <div>
      <h2 className={styles.heading}>Top Expenses</h2>

      <div className={styles.barContainer}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" axisLine={false} display="none" />
            <YAxis
              type="category"
              width={100}
              dataKey="name"
              axisLine={false}
            />
            <Bar dataKey="value" fill="#8884d8" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarTrends