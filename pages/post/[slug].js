import { useRouter } from 'next/router'
import { getPostBySlug, getPropertyByID } from '@lib/firebase'
import { getFormattedDate } from '@lib/utils'
import { useAuth } from '@contexts/auth'
import { Icon, Layout } from '@components'
import styles from '@styles/post.module.scss'

const PostPage = ({ property }) => {
  const router = useRouter()
  const [user] = useAuth()

  // if (!property && typeof window !== 'undefined') {
  //   router.push('/404')
  //   return
  // }

  if (!property) return null

  // return <h1>hi</h1>

  return (
    <Layout
      image={property.imageURLs[0]}
      title={property.title}
      description={property.content}>
      <div>
        <a href="/" className="back">
          <i class="fas fa-long-arrow-alt-left"></i>{' '}
          <span>Back to Listings</span>
        </a>
        {property ? (
          <div
            className="property-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            {user && <div className="edit-property">Edit</div>}

            <div className="property-header">
              {/* <BeerCarousel gallery={property.imageURLs} text="false" /> */}
              <div className="property-header-details">
                <h1 className="font-weight-bold m-2">{property.title}</h1>
                <p className="property-subhead">
                  <span className="rounded-pill bg-warning px-2 mr-2">
                    <b>{property.br}</b> br
                  </span>
                  <span className="rounded-pill bg-warning px-2 mr-2">
                    <b>{property.ba}</b> ba
                  </span>
                  <span className="rounded-pill bg-info px-2 mr-2">
                    1600 sq ft
                  </span>
                </p>
                <p>
                  $130,000
                  <br />
                  <span>Est. Payment: $500/mo</span>
                </p>
              </div>
            </div>

            <div className="property-details">
              {/* <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Details
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>{property.desc}</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Amenities
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>Air Conditioning</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Contact
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <p>
                        Call for more details:
                        <br />
                        <b>(555) 555-5555</b>
                        <br />
                        Or email:
                        <br />
                        <b>availability@beerpropertiesinc.com</b>
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion> */}
            </div>
          </div>
        ) : (
          '🔄 Loading...'
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const property = await getPropertyByID(context.query.slug)

  return {
    props: {
      property
    }
  }
}

export default PostPage
