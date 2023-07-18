'use client'
import { useEffect, useState } from 'react'
import getIUser from './FetchIUser'
import Image from 'next/image'
import styles from './profile.module.css'
import useUserInfo from './userInfo'
import UserReviews from './UserReviews'

const Users = ({ params }) => {
  const { tokenUsername } = useUserInfo()
  const username = params.name
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getIUser(username)
        setUser(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchUser()
  }, [username])

  if (error) {
    return (
      <section className={styles.body}>
        <h1 style={{ fontSize: '48px' }}>{error}</h1>
      </section>
    )
  }

  if (!user) {
    return (
      <section className={styles.body}>
        <h1 style={{ fontSize: '48px' }}>Loading...</h1>
      </section>
    )
  }

  return (
    <article className={styles.body}>
      <section className={styles.userbanner}>
        <section className={styles.picture}>
          <Image
            src={user.profilePicture}
            alt={user.username}
            width={100}
            height={100}
          />
        </section>
        <section className={styles.usermodel}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1>{user.username}</h1>
            {tokenUsername === user.username
              ? (
                <span style={{ color: 'cyan', marginLeft: '10px' }}>
                  Its you!
                </span>
                )
              : null}
          </div>
          <h3>{user.role}</h3>
          <h2>{user.email}</h2>
        </section>
      </section>
      <UserReviews username={user.username} />
    </article>
  )
}

export default Users
