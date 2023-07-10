async function getIndividualChamp (name) {
  const res = await fetch(`http://localhost:5222/api/Champion/name/${name}`, { next: { revalidate: 120 } })

  if (!res.ok) { // ! Recommended to handle errors
    throw new Error('Failed to fetch data')
  }

  return res.json() // * return the data as json
}

export default getIndividualChamp
