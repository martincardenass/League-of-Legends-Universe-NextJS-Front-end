'use client'
import Link from 'next/link'
import { useAppContext } from '@/components/context'
import styles from '../users.module.css'

export default function SignUpPage () {
  const { msg, submitSignUp } = useAppContext()
  const data = {
    username: '', email: '', password: ''
  }

  return (
    <main className={styles.body}>
      <section className={styles.banner}>
        <h1>Sign Up</h1>
        <p>Already have an account? <Link href='login'>Log In</Link> </p>
        <form onSubmit={submitSignUp}>
          <section className={styles.form}>
            <section className={styles.forminput}>
              <p>Username:</p>
              <input type='text' name='username' defaultValue={data.username} />
            </section>
            <section className={styles.forminput}>
              <p>Email:</p>
              <input type='text' name='email' defaultValue={data.email} />
            </section>
            <section className={styles.forminput}>
              <p>Password:</p>
              <input type='password' name='password' defaultValue={data.password} />
            </section>
            <input style={{ marginTop: '1.5rem' }} type='submit' />
            {msg && <p>{msg}</p>}
          </section>
        </form>
      </section>
    </main>
  )
}
