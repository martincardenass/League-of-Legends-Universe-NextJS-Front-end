import getRole from './FetchRole'
import getChampsByRole from './FetchChampsByRole'
import getRoles from '../ListOfRoles'
import shuffle from '@/components/shuffle'
import Image from 'next/image'
import Link from 'next/link'
import styles from './indrole.module.css'

export default async function RolePage ({ params }) {
  const { name } = params
  const role = await getRole(name)
  const champsByRole = await getChampsByRole(name)
  const roles = await getRoles() // * getting the list of roles
  const shuffledRoles = shuffle(roles) // * shuffling the roles
  const filteredRoles = shuffledRoles.filter((r) => r.name !== name) // * filtering the name of the role im in

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image
          src={role.icon}
          alt={role.name}
          width={50}
          height={50}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <h2>{role.name}</h2>
      </header>
      <p className={styles.parag}>
        There are {champsByRole.length} {role.name.toLowerCase()} champions in
        the database.
      </p>
      <ul>
        {champsByRole.map((champion) => (
          <li key={champion.champion_Id}>
            <Link href={`/champions/${champion.name}`}>
              <Image src={champion.champ_Icons} alt={champion.name} height={120} width={120} />
              <h2>{champion.name}</h2>
            </Link>
            <Link href={`/regions/${champion.region_Name}`}>
              <p>{champion.region_Name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <h1 className={styles.h1}>Explore other roles:</h1>
      <ul>
        {filteredRoles.map((role) => (
          <li key={role.role_id}>
            <Link href={`/roles/${role.name}`}>
              <Image
                src={role.icon}
                alt={role.name}
                width={50}
                height={0}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <h2>{role.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
