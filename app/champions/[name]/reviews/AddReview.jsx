'use client'
import styles from './reviews.module.css'
import Link from 'next/link'
import decodeJwt from '@/components/decodeJwt'

const AddReview = ({ name }) => {
  // * Pass "name" as props. This is the champion name
  const token = localStorage.getItem('token')
  let username = ''

  if (token) {
    username = decodeJwt(token).username // * Decode the token. Extract the username
  }

  return (
    <div className={styles.addreviewbody}>
      {username && (
        <p>
          Add a review as {username.charAt(0).toUpperCase() + username.slice(1)}
          .{' '}
          <Link className={styles.notyou} href='/users/login'>
            Not you?
          </Link>
        </p>
      )}
      <div className={styles.footer}>
        {username
          ? (
            <Link href={`reviews/new?champion=${name}`}>
              <button>Add a review</button>
            </Link>
            )
          : (
            <Link href='/users/login'>
              <button>Log in to add a review</button>
            </Link>
            )}
      </div>
    </div>
  )
}

export default AddReview
