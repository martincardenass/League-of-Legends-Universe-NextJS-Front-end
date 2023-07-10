import getRegisteredUsers from './FetchUsers'
import Link from 'next/link'

export default async function Users () {
  const { registeredUsers } = await getRegisteredUsers()

  return (
    <>
      <h1>There are {registeredUsers.length} registered users</h1>
      <p>Have an account?</p>
      <Link href='/users/login'>Log In</Link>
      <p>Not registered yet?</p>
      <Link href='/users/signup'>Sign Up</Link>
    </>
  )
}
