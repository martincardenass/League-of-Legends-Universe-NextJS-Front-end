import getReview from './FetchReviews'
import styles from './reviews.module.css'
import AddReview from './AddReview'

export default async function ReviewsPage ({ params }) {
  const { name } = params
  const reviews = await getReview(name)

  return (
    <main className={styles.body}>
      <ul className={styles.childbody}>
        {reviews.length >= 1
          ? (
              reviews.map(review => (
                <li key={review.review_Id}>
                  <article className={styles.wrapper}>
                    <section className={styles.user}>
                      <p className={styles.reviewer}>{review.reviewer.charAt(0).toUpperCase() + review.reviewer.slice(1).toLowerCase()} says...</p> {/* first character uppercase, remaining lowercase  */}
                      <p>Rating: {review.rating}/5</p>
                      <p>{new Date(review.created).toLocaleDateString()}</p> {/* formatting date */}
                    </section>
                    <section className={styles.reviewbody}>
                      <p className={styles.title}>"{review.review_Title}"</p>
                      <p className={styles.content}>"{review.review}"</p>
                    </section>
                  </article>
                </li>
              ))
            )
          : null}
      </ul>
      <AddReview name={name} />
    </main>

  )
}
