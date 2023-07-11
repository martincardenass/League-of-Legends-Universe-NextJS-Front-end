'use client'
import styles from './newreview.module.css'
import { useAppContext } from '@/components/context'

export default function AddReview ({ params }) {
  const { name } = params // * Gets the champion name from the params
  const { addReview, reviewMsg } = useAppContext()
  const data = { rating: '', reviewTitle: '', reviewText: '' }

  // * We need to pass arguments. Create a new function that will execute the function with arguments
  const handleSubmit = (e) => { // ? curried function
    e.preventDefault()
    addReview(e, name) // * Pass event and the champion name as argument
  }

  // ! Alternative way: <form onSubmit={(e) => addReview(e, name)}>
  return (
    <div className={styles.addreviewbody}>
      <h1>Add review for {name}</h1>
      {/* {username && <h2>User: <span className={styles.cyan}>{username.charAt(0).toUpperCase() + username.slice(1)}</span>. Not you?</h2>} */}
      <form onSubmit={handleSubmit}>
        <p>Title:</p>
        <input type='text' name='reviewTitle' defaultValue={data.reviewTitle} required />
        <p>Review:</p>
        <input type='text' name='reviewText' defaultValue={data.reviewText} required />
        <p>Rating:</p>
        <input type='text' name='rating' defaultValue={data.rating} required />
        <input type='submit' />
      </form>
      {reviewMsg && <p>{reviewMsg}</p>}
    </div>
  )
}
