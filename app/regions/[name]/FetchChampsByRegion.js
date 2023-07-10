async function getChampsByRegion (name) {
  const res = await fetch(`http://localhost:5222/api/Champion/region/name/${name}`, { cache: 'no-store' })

  if (!res.ok) { // ! Recommended to handle errors
    throw new Error('Failed to fetch data')
  }

  return res.json() // * return the data as json
}

export default getChampsByRegion
