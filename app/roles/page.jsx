import getRoles from './ListOfRoles'
import Image from 'next/image'
import Link from 'next/link'

export default async function RolesPage () {
  const roles = await getRoles()

  return (
    <>
      <h1>Roles:</h1>
      <ul>
        {roles.map(role => (
          <li key={role.role_id}>
            <Link href={`/roles/${role.name}`}>
              <Image src={role.icon} alt={role.name} width={50} height={50} style={{ maxWidth: '100%', height: 'auto' }} />
              <h2>{role.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
