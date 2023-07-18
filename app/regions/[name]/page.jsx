import getRegion from './FetchRegion'
import getChampsByRegion from './FetchChampsByRegion'
import getRegions from '../ListOfRegions'
import shuffle from '@/components/shuffle'
import styles from './regions.module.css'
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
      <main className={styles.banner}>
        <header className={styles.bannerimgdiv}>
          <Image
            src={region.background}
            alt={region.name}
            width={2000}
            height={0}
            quality={100}
            className={styles.bannerimg}
          />
        </header>
        <header className={styles.bannercontent}>
          <Image className={styles.bannercontentimg} src={region.emblem} alt={region.name} width={300} height={425} style={{ maxWidth: '100%', height: 'auto' }} />
          <h1>{region.name}</h1>
        </header>
        <section className={styles.regiondesc}>
          <div className={styles.regiondesccontent}>
            <p dangerouslySetInnerHTML={{ __html: region.description }} />
          </div>
        </section>
      </main>
      <article className={styles.recommendations}>
        <section className={styles.championsregion}>
          <h1>Champions of {region.name}:</h1>
          <ul className={styles.championlist}>
            {champsByRegion.map((cbyr) => (
              <li key={cbyr.champion_Id}>
                <Link href={`/champions/${cbyr.name}`}>
                  <Image
                    src={cbyr.champ_Icons}
                    alt={cbyr.name}
                    width={100}
                    height={100}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <h2>{cbyr.name}</h2>
                </Link>
                <Link href={`/roles/${cbyr.role_Name}`}>
                  <p>{cbyr.role_Name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.championsregion}>
          <h1>Explore other regions:</h1>
          <ul className={styles.championlist}>
            {filteredRegions.map((region) => (
              <li key={region.region_id}>
                <Link href={`/regions/${region.name}`}>
                  <Image
                    src={region.emblem}
                    alt={region.name}
                    width={150}
                    height={0}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}
