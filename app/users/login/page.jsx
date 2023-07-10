'use client' // * use client necessary for the Context API
import Link from 'next/link'
import { useAppContext } from '@/components/context'

export default function LoginPage () {
  const { msg, submitLogin } = useAppContext()
  const data = { username: '', password: '' }

  return (
    <>
      <h1>Log In</h1>
      <p>Dont have an account? <Link href='signup'>Sign Up</Link></p>
      <form onSubmit={submitLogin}>
        <p>Username:</p>
        <input type='text' name='username' defaultValue={data.username} />
        <p>Password:</p>
        <input type='password' name='password' defaultValue={data.password} />
        <input type='submit' />
      </form>
      {msg && <p>{msg}</p>}
    </>
  )
}
