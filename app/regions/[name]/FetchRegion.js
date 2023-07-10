async function getRegion (name) {
  const res = await fetch(process.env.API_URL + `/api/Region/name/${name}`, { next: { revalidate: 1 } })

  if (!res.ok) { // ! Recommended to handle errors
    throw new Error('Failed to fetch data')
  }

  return res.json() // * return the data as json
}

export default getRegion
