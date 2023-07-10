import getReview from './FetchReviews'
import styles from './reviews.module.css'
import AddReview from './AddReview'

export default async function ReviewsPage ({ params }) {
  const { name } = params
  const reviews = await getReview(name)

  return (
    <div className={styles.body}>
      <ul className={styles.childbody}>
        {reviews.length >= 1
          ? (
              reviews.map(review => (
                <li key={review.review_Id}>
                  <div className={styles.wrapper}>
                    <div className={styles.user}>
                      <p className={styles.reviewer}>{review.reviewer.charAt(0).toUpperCase() + review.reviewer.slice(1).toLowerCase()} says...</p> {/* first character uppercase, remaining lowercase  */}
                      <p>Rating: {review.rating}/5</p>
                      <p>{new Date(review.created).toLocaleDateString()}</p> {/* formatting date */}
                    </div>
                    <div className={styles.reviewbody}>
                      <p className={styles.title}>"{review.review_Title}"</p>
                      <p className={styles.content}>"{review.review}"</p>
                    </div>
                  </div>
                </li>
              ))
            )
          : null}
      </ul>
      <AddReview />
    </div>

  )
}
