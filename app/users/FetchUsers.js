async function getUsers () {
  const res = await fetch('http://localhost:5222/api/User/users')
  // ! FIX API URL FROM .env

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const users = await res.json()
  const names = users.map(n => n.username) // extract username

  return { users, names }
}

export default getUsers
