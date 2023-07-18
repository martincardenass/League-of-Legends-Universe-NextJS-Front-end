async function getReview (id) {
  const res = await fetch(`http://localhost:5222/api/Review/view/id/${id}`, { next: { revalidate: 120 } })

  if (!res.ok) {
    throw new Error('Failed to get review')
  }

  return res.json()
}

export default getReview
