'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './regionslist.module.css'
import { useState } from 'react'

const RegionModal = ({ regions }) => {
  const [regionSelected, setRegionSelected] = useState('')

  return (
    <article className={styles.body}>
      <section className={styles.images}>
        {regions.map((region) => (
          <Link key={region.region_id} href={`/regions/${region.name}`}>
            <Image
              className={styles.regionimages}
              src={region.background}
              alt={region.name}
              width={2000}
              height={75}
              style={{ maxWidth: '100%', height: 'auto' }}
              onMouseOver={() => {
                setRegionSelected(region)
              }}
            />
          </Link>
        ))}
      </section>
      <section className={styles.regionselected}>
        {regionSelected && (
          <>
            <Image
              className={styles.regionselectedimg}
              key={regionSelected.region_id}
              src={regionSelected.background}
              alt={regionSelected.name}
              width={2000}
              height={75}
            />
            <h1>
              <Link href={`/regions/${regionSelected.name}`} className={styles.regioninner}>
                {regionSelected.name}
              </Link>
            </h1>
            <section className={styles.blackbanner}>
              <span className={styles.selectedregtext}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: regionSelected.description
                      .slice(0, Math.round(regionSelected.description.length / 2.5))
                      .concat('...')
                  }}
                />
              </span>
            </section>
          </>
        )}
      </section>
    </article>
  )
}

export default RegionModal
