import { useAppContext } from '@/components/context'

function UserInformation () { // Get and return each user information field
  const { userInfo } = useAppContext()

  const username = userInfo.username
  const id = userInfo.id
  const role = userInfo.role
  const email = userInfo.email

  return { username, id, role, email }
}

export default UserInformation
