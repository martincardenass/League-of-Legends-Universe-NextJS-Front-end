'use client'
import styles from './newreview.module.css'
import { useAppContext } from '@/components/context'
import SelectHearts from '../SelectHearts'

export default function AddReview ({ params }) {
  const { hearts, heartCount } = SelectHearts()
  const { name } = params // * Gets the champion name from the params
  const { addReview, reviewMsg } = useAppContext()
  const data = { rating: '', reviewTitle: '', reviewText: '' }

  // * We need to pass arguments. Create a new function that will execute the function with arguments
  // ! Alternative way: <form onSubmit={(e) => addReview(e, name)}>
  const handleSubmit = (e) => { // ? curried function
    e.preventDefault()
    addReview(e, name, heartCount) // * Pass event and the champion name as argument
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
          {heartCount === 0 ? (<p>Rate this champion!</p>) : ''}
          {heartCount === 5 ? (<p>Fantastic!</p>) : ''}
          {heartCount === 4 ? (<p>Great!</p>) : ''}
          {heartCount === 3 ? (<p>Okay...</p>) : ''}
          {heartCount === 2 ? (<p>Meh...</p>) : ''}
          {heartCount === 1 ? (<p>Bad</p>) : ''}
        </section>
        <input type='submit' />
      </form>
      {reviewMsg && <p>{reviewMsg}</p>}
    </main>
  )
}
