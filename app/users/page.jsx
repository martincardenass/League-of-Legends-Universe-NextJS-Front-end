import getUsers from './FetchUsers'
import Link from 'next/link'
import styles from './users.module.css'

export default async function Users () {
  const { users } = await getUsers()

  return (
    <main className={styles.body}>
      <section className={styles.banner}>
        <h1>There are {users.length} registered users</h1>
        <p>Have an account?</p>
        <Link href='/users/login'>Log In</Link>
        <p>Not registered yet?</p>
        <Link href='/users/signup'>Sign Up</Link>
      </section>
    </main>
  )
}
