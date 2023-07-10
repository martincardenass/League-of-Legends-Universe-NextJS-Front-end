'use client'
import getRegisteredUsers from '../FetchUsers'
import UserInformation from './userInfo'
import logout from '../logout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserPage ({ params }) {
  const [usernames, setUsernames] = useState([])
  const { username, id, role, email } = UserInformation()
  const router = useRouter()

  useEffect(() => {
    async function fetchUsernames () {
      const { names } = await getRegisteredUsers()
      setUsernames(names)
    }

    fetchUsernames()
  }, [])

  for (let i = 0; i < usernames.length; i++) { // ! need to keep this iteration for the 404 push to work
    if (usernames.includes(params.name)) { // * check if the user in the URL is included in the set of registered users (from database)
      return (
        <>
          {/* Check if the logged username is equal to the URL name, if it is, display its profile, if not, prompt them to login  */}
          {username === params.name
            ? (
              <>
                <p>Username: {username} with ID {id}</p>
                <p>You are: {role}, {role === 'user' ? (<>no admin rights</>) : (<>you have admin rights</>)}</p>
                <p>Email: {email}</p>
                <p onClick={logout}>Logout</p>
              </>
              )
            : (<p>Is it you, {params.name}? <Link href='/users/login'>Log In</Link></p>)}
        </>
      )
    }
    if (!usernames.includes(params.name)) { // * if the user its not included in the set of registered users (from db), return 404
      return router.push('/404')
    }
  }
}
