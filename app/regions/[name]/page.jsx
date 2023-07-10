import getRegion from './FetchRegion'
import getChampsByRegion from './FetchChampsByRegion'
import getRegions from '../ListOfRegions'
import shuffle from '@/components/shuffle'
import Image from 'next/image'
import Link from 'next/link'

export default async function RegionPage ({ params }) {
  const { name } = params
  const region = await getRegion(name)
  const champsByRegion = await getChampsByRegion(name)
  const regions = await getRegions() // * getting the list of regions
  const shuffledRegions = shuffle(regions).slice(0, 5) // * shuffling and showing only 5 random regions
  const filteredRegions = shuffledRegions.filter((r) => r.name !== name) // * filtering the name of the region im in

  return (
    <>
      <Image src={region.emblem} alt={region.name} width={400} height={425} />
      {/* <h2 className='text-white text-4xl'>{region.name}</h2> */}
      {/* Pass as html */}
      <p dangerouslySetInnerHTML={{ __html: region.description }} />
      <p>Champions of {region.name}:</p>
      <ul>
        {champsByRegion.map((cbyr) => (
          <li key={cbyr.champion_Id}>
            <Link href={`/champions/${cbyr.name}`}>
              <Image
                src={cbyr.champ_Icons}
                alt={cbyr.name}
                width={100}
                height={0}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <h2>{cbyr.name}</h2>
            </Link>
            {/* <p>{cbyr.release_Date.slice(0, 10)}</p> */}
            <Link href={`/roles/${cbyr.role_Name}`}>
              <p>{cbyr.role_Name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <h1>Explore other regions:</h1>
      <ul>
        {filteredRegions.map((region) => (
          <li key={region.region_id}>
            <Link href={`/regions/${region.name}`}>
              <Image
                src={region.emblem}
                alt={region.name}
                width={250}
                height={0}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              {/* <h2>{region.name}</h2> */}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
