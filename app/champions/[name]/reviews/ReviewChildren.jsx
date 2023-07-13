'use client'
import Link from 'next/link'
import styles from './reviews.module.css'
import { useState } from 'react'

const ReviewChildren = ({ review, champion, children }) => {
  const [toggle, setToggle] = useState(false)

  const handleClick = () => {
    setToggle(!toggle)
  }

  return review.length >= 1
    ? (
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
    : (
      <h2 className={styles.texts}>{champion.name} has no reviews yet.</h2>
      )
}
export default ReviewChildren
