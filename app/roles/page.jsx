import getRoles from './ListOfRoles'
import Image from 'next/image'
import Link from 'next/link'
import styles from './roles.module.css'

export default async function RolesPage () {
  const roles = await getRoles()

  return (
    <main className={styles.main}>
      <h1>Roles:</h1>
      <ul className={styles.roles}>
        {roles.map(role => (
          <li className={styles.images} key={role.role_id}>
            <Link href={`/roles/${role.name}`}>
              <Image className={styles.image} src={role.icon} alt={role.name} width={50} height={50} style={{ maxWidth: '100%', height: 'auto' }} />
              {/* <h2>{role.name}</h2> */}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
