// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import { getPosts, getProperties } from '@lib/firebase'
import { getFormattedDate } from '@lib/utils'
import { Layout } from '@components'
import styles from '@styles/index.module.scss'

const HomePage = ({ posts, properties }) => (
  <Layout>
    <div className={styles.HomePage}>
      <h1>Properties</h1>
      {/* {posts.map((post) => (
        <article key={post.slug}>
          <img src={post.coverImage} alt={post.coverImageAlt} />
          <div>
            <h2>{post.title}</h2>
            <span>{getFormattedDate(post.dateCreated)}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 200)}...`
              }}></p>
            <a href={`/post/${post.slug}`}>Continue Reading</a>
          </div>
        </article>
      ))} */}

      {properties.map((property) => (
        <article key={property.id}>
          {/* <img src={property.imageURLs[0]} alt={'ALT'} /> */}
          <div>
            <h2>{property.title}</h2>
            {/* <span>{getFormattedDate(post.dateCreated)}</span> */}
            <p
              dangerouslySetInnerHTML={{
                __html: `${property.desc}`
              }}></p>
            <a href={`/post/${property.id}`}>Continue Reading</a>
          </div>
        </article>
      ))}
    </div>
  </Layout>
)

export async function getServerSideProps() {
  const posts = await getPosts()
  const properties = await getProperties()

  return {
    props: {
      posts,
      properties
    }
  }
}

export default HomePage
