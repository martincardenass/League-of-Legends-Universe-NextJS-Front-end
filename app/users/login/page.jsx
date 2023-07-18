'use client' // * use client necessary for the Context API
import Link from 'next/link'
import { useAppContext } from '@/components/context'
import styles from '../users.module.css'

export default function LoginPage () {
  const { msg, submitLogin } = useAppContext()
  const data = { username: '', password: '' }

  return (
    <main className={styles.body}>
      <section className={styles.banner}>
        <h1>Log In</h1>
        <p>Dont have an account? <Link href='signup'>Sign Up</Link></p>
        <form onSubmit={submitLogin}>
          <section className={styles.form}>
            <section className={styles.forminput}>
              <p>Username:</p>
              <input type='text' name='username' defaultValue={data.username} />
            </section>
            <section className={styles.forminput}>
              <p>Password:</p>
              <input type='password' name='password' defaultValue={data.password} />
            </section>
            <input style={{ marginTop: '1.5rem' }} type='submit' />
          </section>
        </form>
        {msg && <p>{msg}</p>}
      </section>
    </main>
  )
}
