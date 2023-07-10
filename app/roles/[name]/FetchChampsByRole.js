async function getChampsByRole (name) {
  const res = await fetch(process.env.API_URL + `/api/Champion/role/name/${name}`, { next: { revalidate: 120 } })

  if (!res.ok) { // ! Recommended to handle errors
    throw new Error('Failed to fetch data')
  }

  return res.json() // * return the data as json
}

export default getChampsByRole
