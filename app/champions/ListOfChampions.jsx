import Image from 'next/image'
import Link from 'next/link'
import styles from './champions.module.css'

async function getChamps () {
  const res = await fetch(process.env.API_URL + '/api/Champion/info', {
    next: { revalidate: 1 }
  }) // * revaidate cache every 120 seconds

  if (!res.ok) {
    // ! Recommended to handle errors
    throw new Error('Failed to fetch data')
  }

  return res.json() // * return the data as json
}

export default async function ListOfChampions () {
  const champions = await getChamps() // * get the data

  return (
    <div className={styles.chbody}>
      <ul>
        {champions.map((champs) => (
          <li key={champs.champion_id} className={styles.chcard}>
            <Link href={`/champions/${champs.name}`}>
              <Image
                className={styles.image}
                src={champs.image}
                alt={champs.name}
                width={308}
                height={560}
                quality={100}
              />
              <h2>{champs.name}</h2>
              <div className={styles.icons}>
                <Link href={`regions/${champs.region_Name}`}>
                  <Image src={champs.region_Emblem} alt={champs.region_Name} style={{ maxWidth: '100%', height: '100%' }} width={50} height={0} />
                </Link>
                <Link href={`roles/${champs.role_Name}`}>
                  <Image src={champs.role_Icon} alt={champs.region_Name} style={{ maxWidth: '100%', height: '100%' }} width={50} height={0} />
                </Link>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
