'use client'
import { useEffect, useState } from 'react'
import styles from './newreview.module.css'
import { useAppContext } from '@/components/context'

export default function AddReview ({ params }) {
  const { name } = params // * Gets the champion name from the params
  const { addReview, reviewMsg } = useAppContext()
  const data = { rating: '', reviewTitle: '', reviewText: '' }
  const [heartCount, setHeartCount] = useState(0)
  const [hId, setHId] = useState(0)
  const hearts = []

  // * We need to pass arguments. Create a new function that will execute the function with arguments
  // ! Alternative way: <form onSubmit={(e) => addReview(e, name)}>
  const handleSubmit = (e) => { // ? curried function
    e.preventDefault()
    addReview(e, name, heartCount) // * Pass event and the champion name as argument
  }

  // * Get the ID attribute from the label > span
  const handleHeartClick = (event) => {
    setHId(parseInt(event.target.id))
  }

  useEffect(() => {
    console.log(hId)
  }, [hId])

  for (let i = 5; i >= 1; i--) { // * Iterate like this because ~ CSS does not have for any previos elements
    const isClicked = i <= hId
    hearts.push(
      <label key={i} onClick={() => { setHeartCount(i) }}>
        <span id={i} className={isClicked ? styles.clicked : ''} onClick={handleHeartClick}>❤</span>
      </label>
    )
  }

  return (
    <main className={styles.body}>
      <h1>Add review for {name}</h1>
      <form onSubmit={handleSubmit}>
        <section className={styles.fields1}>
          <p>Title:</p>
          <input type='text' name='reviewTitle' defaultValue={data.reviewTitle} required autoComplete='off' />
        </section>
        <section className={styles.fields1}>
          <p>Review:</p>
          <textarea className={styles.fieldreview} type='text' name='reviewText' defaultValue={data.reviewText} required autoComplete='off' />
        </section>
        <section className={styles.fields}>
          {hearts}
        </section>
        <section className={styles.rwsg}>
          {hId === 0 ? (<p>Rate this champion!</p>) : ''}
          {hId === 5 ? (<p>Fantastic!</p>) : ''}
          {hId === 4 ? (<p>Great!</p>) : ''}
          {hId === 3 ? (<p>Okay...</p>) : ''}
          {hId === 2 ? (<p>Meh...</p>) : ''}
          {hId === 1 ? (<p>Bad</p>) : ''}
        </section>
        <input type='submit' />
      </form>
      {reviewMsg && <p>{reviewMsg}</p>}
    </main>
  )
}
