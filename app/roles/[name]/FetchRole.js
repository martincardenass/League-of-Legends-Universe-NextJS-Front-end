async function getRole (name) {
  const res = await fetch(process.env.API_URL + `/api/Role/name/${name}`, { next: { revalidate: 120 } })

  if (!res.ok) { // ! Recommended to handle errors
    throw new Error('Failed to fetch data')
  }

  return res.json() // * return the data as json
}

export default getRole
