async function getIUser (name) {
  const res = await fetch(`http://localhost:5222/api/User/users/${name}`, { cache: 'no-store' })

  if (res.ok) { // Request successful, return user data
    return res.json()
  } else { // If not, catch the error as text (not json!) and return it
    const error = await res.text()
    throw new Error(error)
  }
}

export default getIUser
