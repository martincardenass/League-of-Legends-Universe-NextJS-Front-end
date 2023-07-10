import getRegions from './ListOfRegions'
import Image from 'next/image'
import Link from 'next/link'

export default async function RegionsPage () {
  const regions = await getRegions()

  return (
    <>
      <h1>Regions:</h1>
      {regions.map((region) => (
        <li key={region.region_id}>
          <Link href={`/regions/${region.name}`}>
            <Image src={region.emblem} alt={region.name} width={150} height={200} style={{ maxWidth: '100%', height: 'auto' }} />
            <h2>{region.name}</h2>
          </Link>
        </li>
      ))}
    </>
  )
}
