import getIndividualChamp from './FetchChamp'
import getReview from './reviews/FetchReviews'
import getRelatedChamps from './FetchRelatedChamps'
import getChampsByRegion from '@/app/regions/[name]/FetchChampsByRegion'
import ReviewChildren from './reviews/ReviewChildren'
import shuffle from '@/components/shuffle'
import styles from './championsname.module.css'
import ImageSlider from './ImageSlider'
import Icons from './Icons'
import Image from 'next/image'
import Link from 'next/link'

const IndChampPage = async ({ children, params }) => {
  const { name } = params
  const champion = await getIndividualChamp(name)
  const review = await getReview(name)
  const relatedChamps = await getRelatedChamps( // * We pass region_name and role_name as arguments
    champion.region_Name,
    champion.role_Name
  )

  const champsByRegion = await getChampsByRegion(champion.region_Name)

  const slicedChamps = shuffle(champsByRegion).filter(
    (r) => r.name !== champion.name
  )
    .slice(0, 5)

  const filteredRelatedChamps = relatedChamps.filter(
    (r) => r.name !== champion.name // * Using "name" from params doesn't work for champions with multiple images. Why?
  )

  const champsTogether = [ // * New array containing champions that share the Region (but different role) of the current champion
    ...filteredRelatedChamps, // * Gets the champions that share both the Region and Role of the current champion
    ...slicedChamps.filter(
      (c) => !filteredRelatedChamps.some((n) => n.name === c.name) // * Join the two arrays, and, on the second array, filter the objects already included in the first array
    )
  ].slice(0, 5) // * will only be used if the amount of champions that share the same Region and Role of the current champion is less than 5.

  return (
    <main className={styles.body}>
      <article className={styles.championinfo}>
        <section className={styles.championinfocontent}>
          <h1>{champion.name}</h1>
          <p className={styles.catchphrase}>{champion.catchphrase}&nbsp;<span style={{ color: 'white' }}>-&nbsp;{champion.release_date.slice(0, 10)}</span></p>
          <p className={styles.description}>"{champion.description}"</p>
          <Icons champion={champion} />
        </section>
        <section className={styles.images}>
          <Image
            src={champion.image}
            alt={champion.name}
            width={306}
            height={560}
            quality={100}
          />
        </section>
      </article>
      {/* Show the additional images if they exist, if not: return null */}
      {champion.additionalImages.length >= 1
        ? (
          <article className={styles.slidercontainer}><ImageSlider champion={champion} /></article>
          )
        : (
            null
          )}
      <ReviewChildren review={review} champion={champion}>{children}</ReviewChildren> {/* Instead of passing children as props */}
      <h1 className={styles.texts}>Related champions:</h1>
      {/* filteredRelatedChamps returns a collection of champions that share the same region and role, however, some champions do not have even one champion that mets this condition
          so we check if the length filteredRelatedChamps is more than one */}
      {filteredRelatedChamps.length >= 1
        ? (
            filteredRelatedChamps.length < 5
              ? (
                <ul className={styles.relatedchamps}> {/* Then we check if the length of filteredRelatedChamps is less than 5, if it is, we return a new collection that contains; first: champions with the same
                    region and role and second: champions with the same region but different role. This new collection is limited to 5 items */}
                  {champsTogether.map((ct) => (
                    <li key={ct.champion_Id}>
                      <Link href={`/champions/${ct.name}`}>
                        <p>{ct.name}</p>
                        <Image
                          src={ct.champ_Icons}
                          alt={ct.name}
                          width={120}
                          height={120}
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                )
              : (
                <ul className={styles.relatedchamps}> {/* If its length is 5 or greather than, we display the champions that share the same region and role as normal, again this is also limited to 5 */}
                  {filteredRelatedChamps.map((rc) => (
                    <li key={rc.champion_Id}>
                      <Link href={`/champions/${rc.name}`}>
                        <p>{rc.name}</p>
                        <Image
                          src={rc.champ_Icons}
                          alt={rc.name}
                          width={120}
                          height={120}
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                )
          )
        : (
          <ul className={styles.relatedchamps}> {/* If filteredRelatedChamps length is 0, we simply display champions that share the same region. */}
            {slicedChamps.map((cbr) => (
              <li key={cbr.champion_Id}>
                <Link href={`/champions/${cbr.name}`}>
                  <p>{cbr.name}</p>
                  <Image
                    src={cbr.champ_Icons}
                    alt={cbr.name}
                    width={120}
                    height={120}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Link>
              </li>
            ))}
          </ul>
          )}
    </main>
  )
}

export default IndChampPage
