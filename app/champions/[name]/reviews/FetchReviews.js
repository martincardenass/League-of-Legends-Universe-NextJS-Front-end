async function getReview (name) {
  const res = await fetch(`http://localhost:5222/api/Review/review/champion/name/${name}`, { next: { revalidate: 1 } })

  return res.json() // * return the data as json
}

export default getReview
