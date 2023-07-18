async function getUserReviews (username) {
  const res = await fetch(`http://localhost:5222/api/Review/${username}/reviews`, { cache: 'no-store' })

  if (res.ok) {
    return res.json()
  } else {
    const error = await res.text()
    throw new Error(error)
  }
}

export default getUserReviews
