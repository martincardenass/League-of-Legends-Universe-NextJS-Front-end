'use client'
import Link from 'next/link'
import styles from './championsname.module.css'
import Image from 'next/image'
import { useState } from 'react'

const Icons = ({ champion }) => {
  const [toggleAnimation, setToggleAnimation] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseOverRegion = () => {
    setIsHovered(true)
  }

  const handleMouseLeaveRegion = () => {
    setIsHovered(false)
  }

  const handleMouseOverRole = () => {
    setToggleAnimation(true)
  }

  const handleMouseLeaveRole = () => {
    setToggleAnimation(false)
  }

  return (
    <>
      <div className={styles.championinfocontenticons}>
        <Link href={`/regions/${champion.region_Name}`}>
          <div className={styles.bannercontainer}>
            <div
              className={`${styles.individualimageicon} ${
                isHovered ? styles.individualimageiconopen : ''
              }`}
              onMouseEnter={handleMouseOverRegion}
              onMouseLeave={handleMouseLeaveRegion}
            >
              <Image
                className={styles.icons}
                src={champion.region_Emblem}
                alt={champion.region_Name}
                width={75}
                height={75}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p className={styles.iconstext}>{champion.region_Name}</p>
              <div
                className={`${styles.popupmessage} ${
                  isHovered ? styles.actualHover : ''
                }`}
                style={{ display: isHovered ? 'flex' : 'none' }}
              >
                <p>Explore champions of {champion.region_Name}</p>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`/roles/${champion.role_Name}`}>
          <div
            className={`${styles.individualimageicon} ${
              toggleAnimation ? styles.individualimageiconopenrole : ''
            }`}
            onMouseEnter={handleMouseOverRole}
            onMouseLeave={handleMouseLeaveRole}
          >
            <Image
              className={styles.icons}
              src={champion.role_Icon}
              alt={champion.role_Nmae}
              width={75}
              height={75}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <p className={styles.iconstext}>{champion.role_Name}</p>
            <div
              className={`${styles.popupmsgregion} ${
                toggleAnimation ? styles.actualHover : ''
              }`}
              style={{ display: toggleAnimation ? 'flex' : 'none' }}
            >
              <p>More {champion.role_Name} champions</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Icons
