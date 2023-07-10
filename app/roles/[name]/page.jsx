import getRole from './FetchRole'
import getChampsByRole from './FetchChampsByRole'
import getRoles from '../ListOfRoles'
import shuffle from '@/components/shuffle'
import Image from 'next/image'
import Link from 'next/link'

export default async function RolePage ({ params }) {
  const { name } = params
  const role = await getRole(name)
  const champsByRole = await getChampsByRole(name)
  const roles = await getRoles() // * getting the list of roles
  const shuffledRoles = shuffle(roles) // * shuffling the roles
  const filteredRoles = shuffledRoles.filter((r) => r.name !== name) // * filtering the name of the role im in

  return (
    <>
      <Image
        src={role.icon}
        alt={role.name}
        width={50}
        height={50}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <h2>{role.name}</h2>
      <p>
        There are {champsByRole.length} {role.name.toLowerCase()} champions in
        the database.
      </p>
      <p>{role.name} champions:</p>
      <ul>
        {champsByRole.map((cbyr) => (
          <li key={cbyr.champion_Id}>
            <Link href={`/champions/${cbyr.name}`}>
              <h2>{cbyr.name}</h2>
            </Link>
            <p>{cbyr.release_Date.slice(0, 10)}</p>
            <Link href={`/regions/${cbyr.region_Name}`}>
              <p>{cbyr.region_Name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <h1>Explore other roles:</h1>
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
    </>
  )
}
