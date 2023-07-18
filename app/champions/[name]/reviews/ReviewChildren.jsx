'use client'
import Link from 'next/link'
import styles from './reviews.module.css'
import { useState } from 'react'

const ReviewChildren = ({ champion, children }) => {
  const [toggle, setToggle] = useState(false)

  const handleClick = () => {
    setToggle(!toggle)
  }

  return (
    <main className={styles.mainreview}>
      {!toggle
        ? (
          <Link href={`/champions/${champion.name}/reviews`}>
            <h1 onClick={handleClick} className={styles.texts}>
              Show reviews
            </h1>
          </Link>
          )
        : (
          <Link href={`/champions/${champion.name}`}>
            <h1 onClick={handleClick} className={styles.texts}>
              Hide reviews
            </h1>
          </Link>
          )}
      {children}
    </main>
  )
}
export default ReviewChildren
