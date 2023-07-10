'use client' // * useclient necessary because this function uses the context
import logout from './users/logout'
import Link from 'next/link'
import UserInformation from './users/[name]/userInfo'

export default function HomePage () {
  const { username } = UserInformation()

  return (
    <>
      <h1>Welcome to the homepage</h1>
      {username
        ? (
          <>
            <p>Welcome, <Link href={`users/${username}`}>{username}</Link></p>
            <p onClick={logout}>Logout</p>
          </>
          )
        : (
          <Link href='/users/login'>
            <p>Login</p>
          </Link>
          )}
      <Link href='/champions'>
        <h1>Champions</h1>
      </Link>
    </>
  )
}
