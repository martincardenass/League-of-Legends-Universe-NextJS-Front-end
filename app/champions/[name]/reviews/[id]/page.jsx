'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import getReview from './FetchIReview'
import styles from './reviewi.module.css'
import Hearts from '../Hearts'
// import EditPencil from '../Pencil'

const ReviewId = () => {
  const [review, setReview] = useState({})
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const fetchReview = async () => {
      const fetchReviewData = await getReview(id)
      setReview(fetchReviewData)
    }

    fetchReview()
  }, [id])

  return (
    <article className={styles.body}>
      <section className={styles.bodycontainer}>
        <section className={styles.userside}>
          <h2>{review.reviewer} says...</h2>
          <section style={{ fontSize: '75px' }}>
            <Hearts review={review} />
          </section>
          <p>{new Date(review.created).toLocaleDateString()}</p>
        </section>
        <section className={styles.reviewside}>
          <h3>{review.review_Title}</h3>
          <p>{review.review}</p>
        </section>
      </section>
    </article>
  )
}

export default ReviewId
