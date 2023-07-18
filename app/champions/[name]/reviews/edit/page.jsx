'use client'
import { useSearchParams } from 'next/navigation' // * https://nextjs.org/docs/app/api-reference/functions/use-search-params
import getReview from '../[id]/FetchIReview'
import { useEffect, useState } from 'react'
import styles from '../new/newreview.module.css'
import SelectHearts from '../SelectHearts'
import Link from 'next/link'
import patchReview from './PatchReview'

const EditReviewId = ({ params }) => {
  const { hearts, heartCount, setHeartCount } = SelectHearts()
  const { name } = params
  const searchParams = useSearchParams()
  const id = searchParams.get('review')
  const [review, setReview] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    // * useeffect otherwise error
    const fetchReview = async () => {
      const fetchReviewData = await getReview(id)
      setReview(fetchReviewData)
      setHeartCount(fetchReviewData.rating) // * Had to do it like this because initilizing useState with review.rating did not work
    }

    fetchReview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]) // * will get review and asign to a state only when the id changes. and the id comes from url so it only "changes" once

  const handleSubmit = async (e) => {
    // ? For the patch request
    e.preventDefault()
    const token = localStorage.getItem('token') // & Get the token to validate
    const data = Object.fromEntries(new FormData(e.target)) // * Getting the data from the form
    const rating = parseInt(heartCount) // * Getting the heart count
    const result = await patchReview(
      id,
      token,
      rating,
      data.reviewTitle,
      data.reviewText
    ) // * Sending HTTP Patch request

    setMsg(result)
  }

  console.log(review)

  return (
    <main className={styles.body}>
      <h1>Edit review for {name}</h1>
      <form onSubmit={handleSubmit}>
        <section className={styles.fields1}>
          <p>Title:</p>
          <input
            type='text'
            name='reviewTitle'
            defaultValue={review.review_Title}
            required
            autoComplete='off'
          />
        </section>
        <section className={styles.fields1}>
          <p>Review:</p>
          <textarea
            className={styles.fieldreview}
            type='text'
            name='reviewText'
            defaultValue={review.review}
            required
            autoComplete='off'
          />
        </section>
        <section className={styles.fields}>{hearts}</section>
        <section className={styles.rwsg}>
          {heartCount === 0 ? <p>Rate this champion!</p> : ''}
          {heartCount === 5 ? <p>Fantastic!</p> : ''}
          {heartCount === 4 ? <p>Great!</p> : ''}
          {heartCount === 3 ? <p>Okay...</p> : ''}
          {heartCount === 2 ? <p>Meh...</p> : ''}
          {heartCount === 1 ? <p>Bad</p> : ''}
        </section>
        <input type='submit' />
      </form>
      {msg && (
        <section>
          {msg.success
            ? (
              <p>
                {msg.message} <Link href={`${id}`}>See review</Link>
              </p>
              )
            : (
              <p>{msg.message}</p>
              )}
        </section>
      )}
    </main>
  )
}

export default EditReviewId
