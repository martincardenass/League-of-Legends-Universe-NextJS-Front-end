'use client' // ! There might be a way to do this without having to create a client componet
import getUserReviews from './FetchUserReviews'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './profile.module.css'
import Hearts from '@/app/champions/[name]/reviews/Hearts'

const UserReviews = ({ username }) => {
  const [reviews, setReviews] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const data = await getUserReviews(username)
        setReviews(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchUserReviews()
  }, [username])

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <main className={styles.activity}>
      <h1>{username}'s reviews</h1>
      <article className={styles.reviews}>
        <ul>
          {reviews?.map((review) => (
            <section key={review.review_Id}>
              <h2>
                {review.reviewer.charAt(0).toUpperCase() +
                  review.reviewer.slice(1)}{' '}
                posted a review for{' '}
                <Link href={`/champions/${review.name}`}>{review.name}</Link>
              </h2>
              <Link
                href={`/champions/${review.name}/reviews/${review.review_Id}`}
              >
                <li>
                  <section style={{ fontSize: '45px' }}>
                    <Hearts review={review} />
                  </section>
                  <p>{new Date(review.created).toLocaleDateString()}</p>
                  <h2>{review.review_Title}</h2>
                  <p>{review.review}</p>
                </li>
              </Link>
            </section>
          ))}
        </ul>
      </article>
    </main>
  )
}

export default UserReviews
