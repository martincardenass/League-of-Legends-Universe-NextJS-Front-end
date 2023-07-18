import getReview from './FetchReviews'
import styles from './reviews.module.css'
import AddReview from './AddReview'
import Hearts from './Hearts'
import Link from 'next/link'
import EditPencil from './Pencil'

export default async function ReviewsPage ({ params }) {
  const { name } = params
  const reviews = await getReview(name)

  return (
    <main className={styles.body}>
      <ul className={styles.childbody}>
        {reviews.length >= 1
          ? (
              reviews.map(review => (
                <Link key={review.review_Id} href={`reviews/${review.review_Id}`}>
                  <li key={review.review_Id}>
                    <article className={styles.wrapper}>
                      <section className={styles.user}>
                        <div className={styles.usercontent}>
                          <p className={styles.reviewer}>{review.reviewer}</p>
                          <EditPencil review={review} />
                        </div>
                        <Hearts review={review} />
                        <p>{new Date(review.created).toLocaleDateString()}</p>
                      </section>
                      <section className={styles.reviewbody}>
                        <p className={styles.title}>"{review.review_Title}"</p>
                        <p className={styles.content}>"{review.review}"</p>
                      </section>
                    </article>
                  </li>
                </Link>
              ))
            )
          : <h2 style={{ textAlign: 'center' }}>...sigh. Such empty. {name} has no reviews.</h2>}
      </ul>
      <AddReview name={name} />
    </main>

  )
}
