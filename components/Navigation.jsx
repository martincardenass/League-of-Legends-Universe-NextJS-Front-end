'use client'
import Link from 'next/link'
import decodeJwt from './decodeJwt'
import styles from './nav.module.css'

const links = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Champions',
    route: '/champions'
  },
  {
    label: 'Regions',
    route: '/regions'
  },
  {
    label: 'Roles',
    route: '/roles'
  }
]

export function Navigation () {
  const token = localStorage.getItem('token')
  let username = ''

  if (token) {
    username = (decodeJwt(token).username)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <nav className={styles.nav}>
      <p>League of Legends Universe</p>
      <nav>
        <ul className={styles.navlinks}>
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {username
        ? (
          <section className={styles.userlogged}>
            <Link href={`/users/${username}`}><p>{username.charAt(0).toUpperCase() + username.slice(1)}</p></Link>
            <p onClick={handleLogout} className={styles.logout}>Logout</p>
          </section>
          )
        : (
          <section className={styles.users}>
            <Link href='/users/login'>
              <p className={styles.login}>Login</p>
            </Link>
            <Link href='/users/signup'>
              <p className={styles.signup}>Signup</p>
            </Link>
          </section>
          )}
    </nav>
  )
}
