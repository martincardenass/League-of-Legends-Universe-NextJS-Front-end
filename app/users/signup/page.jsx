'use client'
import Link from 'next/link'
import { useAppContext } from '@/components/context'

export default function SignUpPage () {
  const { msg, submitSignUp } = useAppContext()
  const data = {
    username: '', email: '', password: ''
  }

  return (
    <>
      <h1>Sign Up</h1>
      <p>Already have an account? <Link href='login'>Log In</Link> </p>
      <form onSubmit={submitSignUp}>
        <p>Username:</p>
        <input type='text' name='username' defaultValue={data.username} />
        <p>Email:</p>
        <input type='text' name='email' defaultValue={data.email} />
        <p>Password:</p>
        <input type='password' name='password' defaultValue={data.password} />
        <input type='submit' />
        {msg && <p>{msg}</p>}
      </form>
    </>
  )
}
