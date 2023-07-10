async function getRelatedChamps (regionName, roleName) {
  const res = await fetch(
    `http://localhost:5222/api/Champion/related/${regionName}/${roleName}`
  )

  if (!res.ok) {
    // ! Recommended to handle errors
    throw new Error('Failed to fetch data')
  }

  return res.json() // * return the data as json
}

export default getRelatedChamps
