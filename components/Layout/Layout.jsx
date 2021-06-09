import Head from 'next/head'
import { signOut } from '@lib/firebase'
import { useAuth } from '@contexts/auth'
import { BeerNav, BeerFooter } from '@components'

import styles from './Layout.module.scss'

const Layout = ({ children, image, title, description }) => {
  const [user] = useAuth()

  return (
    <>
      <Head>
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossOrigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossOrigin="anonymous"></script>
      </Head>

      <div>
        <BeerNav />
        <main>{children}</main>
        <BeerFooter />
      </div>
    </>
  )
}

export default Layout
