async function getRegisteredUsers () {
  const res = await fetch('http://localhost:5222/api/User/users')
  // ! FIX API URL FROM .env

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const registeredUsers = await res.json()
  const names = registeredUsers.map(n => n.username) // extract username

  return { registeredUsers, names }
}

export default getRegisteredUsers
