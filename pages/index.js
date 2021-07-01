import React, { useState, useEffect } from 'react'
import { getProperties } from '@lib/firebase'
import { Layout } from '@components'
import { useAuth } from '@contexts/auth'
// react-bootstrap component imports
import Button from 'react-bootstrap/Button'

const Home = ({ posts, properties }) => {
  const [windowHeight, setWindowHeight] = useState(undefined)

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowHeight(window.innerHeight)
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Layout>
      <div className="home" style={{ height: windowHeight }}>
        <img
          className="home-img"
          src="images/kitchen.jpg"
          alt="Beautiful Home"
        />

        <div className="home-text">
          <h1 className="mb-3">Homepage H1</h1>

          <p>
            Homepage paragraph text.
            <br />
            Give us a call at (555) 555-5555 or schedule an appointment online:
          </p>

          <Button>Schedule an Appointment</Button>
        </div>

        <div className="image-info">
          <div className="info">
            <span>
              Photo by{' '}
              <a href="https://unsplash.com/@aahubs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Aaron Huber
              </a>{' '}
              on{' '}
              <a href="https://unsplash.com/s/photos/real-estate-house?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const properties = await getProperties()

  return {
    props: {
      properties
    }
  }
}

export default Home
