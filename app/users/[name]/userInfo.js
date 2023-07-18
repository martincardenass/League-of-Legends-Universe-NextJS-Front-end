import { useAppContext } from '@/components/context'

function useUserInfo () { // Get and return each user information field
  const { userInfo } = useAppContext()

  const tokenUsername = userInfo.username
  const id = userInfo.id
  const role = userInfo.role
  const email = userInfo.email

  return { tokenUsername, id, role, email }
}

export default useUserInfo
